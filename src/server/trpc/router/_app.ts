// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { imageRouter } from "./images";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  images: imageRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
