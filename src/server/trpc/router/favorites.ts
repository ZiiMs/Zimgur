import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const favoriteRouter = router({
  getAll: protectedProcedure
    .input(
      z.object({
        id: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log("Session", ctx.session?.user);
      const id = input.id ?? ctx.session.user.id;
      const fetchIds = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          Favorites: true,
        },
      });

      return fetchIds.Favorites;
    }),
  check: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log("Session", ctx.session?.user);
      const fetchIds = await ctx.prisma.user.count({
        where: {
          id: ctx.session.user.id,
          Favorites: {
            some: {
              id: input.id,
            },
          },
        },
      });

      return fetchIds > 0 ? true : false;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const added = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          Favorites: {
            disconnect: {
              id: input.id,
            },
          },
        },
      });

      console.log("Added?", added);
      return added;
    }),
  add: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const added = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          Favorites: {
            connect: {
              id: input.id,
            },
          },
        },
      });

      console.log("Added?", added);
      return added;
    }),
});
