import { TRPCError } from "@trpc/server";
import { Deta } from "deta";
import mime from "mime-types";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const deta = Deta(env.DETA_PROJECT_KEY);

const photos = deta.Drive("photos");

export const userRouter = router({
  getAll: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log("Session", ctx.session?.user);
      const fetchIds = await ctx.prisma.images.findMany({
        where: {
          userId: input.id,
        },
        select: {
          id: true,
          extension: true,
          type: true,
        },
      });

      return fetchIds;
    }),
});
