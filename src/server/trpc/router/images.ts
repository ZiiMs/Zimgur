import mime from "mime-types";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { protectedProcedure, publicProcedure, router } from "../trpc";

import { Deta } from "deta";

const deta = Deta(env.DETA_PROJECT_KEY);

const photos = deta.Drive("photos");

export const imageRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        image: z.any(),
        extension: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const img: Uint8Array = input.image;
      const image = ctx.prisma.images
        .create({
          data: {
            userId: ctx.session.user.id,
            extension: input.extension,
            type: input.type,
          },
        })
        .then((image) => {
          console.log(img, input.type);
          const postedImage = photos
            .put(`${image.id}.${input.extension}`, {
              data: img,
              contentType: input.type,
            })
            .then((data) => {
              console.log("Saved?", data);
            })
            .catch((err) => {
              console.error("Error: ", err);
            });
        });

      return await image;
    }),
  create2: protectedProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const img = await fetch(input.url);
      const get = await img.blob();
      const uint = new Uint8Array(await get.arrayBuffer());

      const extension = mime.extension(get.type);
      if (!extension) return;

      console.log("Toi");

      const image = ctx.prisma.images
        .create({
          data: {
            userId: ctx.session.user.id,
            extension: extension,
            type: get.type,
          },
        })
        .then((image) => {
          const postedImage = photos
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
        });

      return image;
    }),
  get: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
