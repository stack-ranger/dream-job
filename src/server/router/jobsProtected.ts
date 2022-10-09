import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { createProtectedRouter } from './context'

export const jobProtectedRouter = createProtectedRouter()
  .mutation('save', {
    input: z.object({
      jobId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.savedJob.create({
          data: {
            userId: ctx.session.user.id,
            jobId: input.jobId,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })
  .mutation('delete', {
    input: z.object({
      jobId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const queryString = Prisma.sql`
          DELETE FROM "public"."SavedJob" WHERE userId == ${ctx.session.user.id} AND jobId == ${input.jobId}
        `
        await ctx.prisma.$queryRaw(queryString)
      } catch (error) {
        console.log(error)
      }
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.savedJob.findMany({
          where: {
            userId: {
              equals: ctx.session.user.id,
            },
          },
          include: {
            job: true
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
