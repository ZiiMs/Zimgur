import { Deta } from "deta";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { protectedProcedure, router } from "../trpc";

const deta = Deta(env.DETA_PROJECT_KEY);

const photos = deta.Drive(env.DETA_DRIVE);

export const userRouter = router({
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
          Images: true,
        },
      });

      return fetchIds.Images;
    }),
  "collection.getAll": protectedProcedure.query(async ({ ctx }) => {
    const cols = ctx.prisma.collections.findMany({
      where: {
        Owner: {
          id: ctx.session.user.id,
        },
      },
    });

    return cols;
  }),
});
