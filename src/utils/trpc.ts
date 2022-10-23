import type { AppRouter } from '~/server/router'
import { createReactQueryHooks, createTRPCClient } from '@trpc/react'
import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server'
import superjson from 'superjson'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpcClient = createTRPCClient<AppRouter>({
  url: `${getBaseUrl()}/api/trpc`,
  transformer: superjson,
})

export const trpc = createReactQueryHooks<AppRouter>()

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

export type inferQueryInput<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureInput<
  AppRouter['_def']['queries'][TRouteKey]
>

export type inferMutationOutput<TRouteKey extends keyof AppRouter['_def']['mutations']> = inferProcedureOutput<
  AppRouter['_def']['mutations'][TRouteKey]
>

export type inferMutationInput<TRouteKey extends keyof AppRouter['_def']['mutations']> = inferProcedureInput<
  AppRouter['_def']['mutations'][TRouteKey]
>
