import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const collectionRouter = router({
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const fetchIds = await ctx.prisma.collections.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      return fetchIds;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const col = await ctx.prisma.collections.delete({
        where: {
          id: input.id,
        },
      });

      console.log("Deleted?", col);
      return col;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const collection = await ctx.prisma.collections.create({
        data: {
          name: input.name,
          Owner: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      console.log("CreatedCollection?", collection);
      return collection;
    }),
  add: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        imageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const col = await ctx.prisma.collections.update({
        where: {
          id: input.id,
        },
        data: {
          Images: {
            connect: {
              id: input.imageId,
            },
          },
        },
      });

      console.log("AddedImageToCollection?", col);
      return col;
    }),
});
