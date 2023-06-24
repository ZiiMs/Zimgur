// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { collectionRouter } from "./collections";
import { favoriteRouter } from "./favorites";
import { imageRouter } from "./images";
import { userRouter } from "./user";

export const appRouter = router({
  images: imageRouter,
  auth: authRouter,
  user: userRouter,
  favorite: favoriteRouter,
  collection: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
