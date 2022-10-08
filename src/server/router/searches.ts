import { z } from 'zod'
import { createProtectedRouter } from './context'

export const searchesRouter = createProtectedRouter()
  .mutation('postMessage', {
    input: z.object({
      userId: z.string(),
      query: z.string(),
      result: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.search.create({
          data: {
            userId: input.userId,
            query: input.query,
            result: input.result,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.search.findMany({
          select: {
            query: true,
            result: true,
          },
          where: {
            userId: {
              equals: ctx.session.user.id,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    },
  })
