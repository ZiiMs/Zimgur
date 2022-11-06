// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { imageRouter } from "./images";

export const appRouter = router({
  example: exampleRouter,
  images: imageRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
