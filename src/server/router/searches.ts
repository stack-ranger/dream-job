import { z } from 'zod'
import { createProtectedRouter } from './context'

export const searchesRouter = createProtectedRouter()

  .mutation('save', {
    input: z.object({
      query: z.string(),
    }),
    async resolve({ ctx, input }) {
      console.log("ctx HÄR ISTÄLLET", ctx.session)

      try {
        await ctx.prisma.search.create({
          data: {
            userId: ctx.session.user.id,
            query: input.query,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      console.log("ctx HÄR ISTÄLLET", ctx.session.user.id)

      try {
        return await ctx.prisma.search.findMany({
          select: {
            createdAt: true,
            query: true,
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
