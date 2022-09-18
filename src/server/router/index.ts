// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { jobRouter } from "./jobs";
import { skillRouter } from "./skills";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("jobs.", jobRouter)
  .merge("skills.", skillRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
