import { prisma } from '../db/client'
import { Prisma } from '@prisma/client'
import { createRouter } from './context'
import { z } from 'zod'
import { SkillCountRaw } from '~/types/skill'

export const skillRouter = createRouter().query('all', {
  input: z.object({
    role: z.string(),
    number: z.number().min(1).max(100).nullish(),
  }),
  async resolve({ input }) {
    const roleCleaned = '%' + input.role.replace(' ', '%') + '%'
    // we have to use a raw query here since prisma does not support joining on the same table twice with full text search
    const queryString = Prisma.sql`SELECT s.name, COUNT(j.id) as skill_count
								FROM "public"."Skill" s
								JOIN "public"."JobSkill" js ON js.skill_name = s.name
								JOIN "public"."Job" j ON j.id  = js.job_id
								WHERE LOWER(j.role) LIKE LOWER(${roleCleaned}) OR LOWER(j.text) LIKE LOWER(${roleCleaned})
								GROUP BY s.name
								ORDER BY skill_count desc 
								LIMIT ${input.number || 20};`
    const skillCounter: SkillCountRaw[] = await prisma.$queryRaw(queryString)
    return skillCounter.map((skillCount: SkillCountRaw) => {
      return {
        name: skillCount.name,
        count: Number(skillCount.skill_count),
      }
    })
  },
})
