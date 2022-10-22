import { createRouter } from './context'
import superjson from 'superjson'

import { jobRouter } from './jobs'
import { searchesRouter } from './searches'
import { skillRouter } from './skills'
import { registrationRouter } from './registration'
import { jobProtectedRouter } from './jobsProtected'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('jobs.', jobRouter)
  .merge('jobsProtected.', jobProtectedRouter)
  .merge('skills.', skillRouter)
  .merge('searches.', searchesRouter)
  .merge("registration.", registrationRouter)

// export type definition of API
export type AppRouter = typeof appRouter
