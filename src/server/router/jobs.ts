import { prisma } from '../db/client'
import { Prisma } from '@prisma/client'
import { createRouter } from './context'
import { z } from 'zod'
import { JobInterface } from '~/types/job'

// determine the number of matching skills, e.g. if we have 3 skills, we can query jobs that at least 2 skills
const requiredMatchesMap = new Map<number, number>([
  [1, 1],
  [2, 2],
  [3, 2],
  [4, 3],
  [5, 3],
])

export const jobRouter = createRouter()
  .query('all', {
    input: z.object({
      keywords: z.array(z.string()), // array of keywords
      number: z.number().optional(), // number of jobs to fetch
      skip: z.number().optional(), // offset for pagination
      matches: z.number().optional(), // number of matches required to be included in the result
    }),
    async resolve({ input }) {
      // if no matches are specified, we use the default mapping
      const requiredSkillsMatches =
        input.matches || requiredMatchesMap.get(input.keywords.length) || input.keywords.length

      // we have to use a raw query here since prisma does not support so complex queries
      const queryString = Prisma.sql`
                                SELECT * FROM 
                                    (SELECT * 
                                     FROM "public"."Job" j, "public"."Company" c
                                     WHERE j.id IN (
                                        SELECT job_id
                                        FROM "public"."JobSkill" js
                                        WHERE position(js.skill_name in ${input.keywords.join(' ')})>0
                                        GROUP BY job_id
                                        HAVING COUNT(*) = ${requiredSkillsMatches}
                                  ) AND j.company_name = c.company_name) as table1
                                JOIN 
                                    (SELECT js.job_id, array_agg("skill_name") as skills
                                     FROM "public"."JobSkill" js
                                     GROUP BY job_id) as table2
                               ON table1.id = table2.job_id
                               OFFSET ${input.skip || 0}
                               LIMIT ${input.number || 20};`
      const jobs: JobInterface[] = await prisma.$queryRaw(queryString)
      return jobs
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const job = await prisma.job.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Company: true,
          JobSkill: {
            select: {
              skill_name: true,
            },
          },
        },
      })
      if (!job) return null
      // slight reformatting of the data required since we have object mismatch
      const jobInterface: JobInterface = {
        ...job,
        skills: job.JobSkill.map((jobSkill) => jobSkill.skill_name),
        logo_url: job.Company.logo_url,
        text: job.text || '',
        date_posted: job.date_posted ? job.date_posted : new Date(),
        source: job.source || '',
        location: job.location || '',
      }
      return jobInterface
    },
  })
