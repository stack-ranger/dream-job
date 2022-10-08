// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { jobRouter } from './jobs'
import { searchesRouter } from './searches'
import { skillRouter } from './skills'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('jobs.', jobRouter)
  .merge('skills.', skillRouter)
  .merge('searches.', searchesRouter)

// export type definition of API
export type AppRouter = typeof appRouter
