import { prisma } from '../db/client'
import { Prisma } from '@prisma/client'
import { createRouter } from './context'
import { z } from 'zod'

export const skillRouter = createRouter().query('all', {
  input: z.object({
    role: z.string(),
    number: z.number().min(1).max(100).nullish(),
  }),
  async resolve({ input }) {
    const roleCleaned = '%' + input.role.replace(' ', '%') + '%'
    const queryString = Prisma.sql`SELECT s.name, COUNT(j.id) as skill_count
								FROM "public"."Skill" s
								JOIN "public"."JobSkill" js ON js.skill_name = s.name
								JOIN "public"."Job" j ON j.id  = js.job_id
								WHERE LOWER(j.role) LIKE LOWER(${roleCleaned}) OR LOWER(j.text) LIKE LOWER(${roleCleaned})
								GROUP BY s.name
								ORDER BY skill_count desc 
								LIMIT ${input.number || 20};`
    const skillCounter: any = await prisma.$queryRaw(queryString)
    // TODO - fix this type
    return skillCounter.map((skillCount: { name: string; skill_count: bigint }) => {
      return {
        ...skillCount,
        count: Number(skillCount.skill_count),
      }
    })
  },
})
