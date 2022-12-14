import { TRPCError } from "@trpc/server";
import { Deta } from "deta";
import mime from "mime-types";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const deta = Deta(env.DETA_PROJECT_KEY);

const photos = deta.Drive(env.DETA_DRIVE);

export const imageRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        type: z.string().optional(),
        isURL: z.boolean().default(false),
        image: z.any().or(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isURL && typeof input.image === "string") {
        const img = await fetch(input.image);
        const get = await img.blob();
        const size = get.size / 1024;
        console.log("SizeDE?", size);
        if (size >= 4096) {
          console.log("Error, image to large");
          throw new TRPCError({
            code: "PAYLOAD_TOO_LARGE",
            message: "Image size is too large.",
          });
        }
        const uint = new Uint8Array(await get.arrayBuffer());
        if (get.type.substring(0, get.type.lastIndexOf("/")) !== "image") {
          throw new TRPCError({
            code: "PARSE_ERROR",
            message: `Invalid type ${get.type.substring(
              0,
              get.type.lastIndexOf("/")
            )}.`,
          });
        }

        console.log("Type!", get.type);
        const extension = mime.extension(get.type);
        if (!extension)
          throw new TRPCError({
            code: "PARSE_ERROR",
            message: `Invalid extension ${extension}.`,
          });

        await ctx.prisma.image
          .create({
            data: {
              userId: ctx.session.user.id,
              extension: extension,
              type: get.type,
            },
          })
          .then(async (image) => {
            await photos
              .put(`${image.id}.${extension}`, {
                data: uint,
                contentType: get.type,
              })
              .then((data) => {
                console.log("Saved?", data);
              })
              .catch((err) => {
                console.error("Error: ", err);
              });
            return image;
          });

        return;
      } else {
        console.log("Creating image...");
        const img: Uint8Array = input.image;
        if (!input.type) return;

        const extension = mime.extension(input.type);
        if (!extension) return;

        await ctx.prisma.image
          .create({
            data: {
              userId: ctx.session.user.id,
              extension: extension,
              type: input.type,
            },
          })
          .then(async (image) => {
            console.log(img, input.type);
            await photos
              .put(`${image.id}.${extension}`, {
                data: img,
                contentType: input.type,
              })
              .then((data) => {
                console.log("Saved?", data);
              })
              .catch((err) => {
                console.error("Error: ", err);
              });

            return image;
          });
        return;
      }
    }),
  get: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure
    .input(
      z.object({
        amount: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log("Session", ctx.session?.user);
      const fetchIds = await ctx.prisma.image.findMany({
        select: {
          id: true,
          extension: true,
          type: true,
          name: true,
          createdAt: true,
          Owner: true,
        },
        take: input.amount,
      });

      return fetchIds;
    }),
});
