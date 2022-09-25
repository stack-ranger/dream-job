import {prisma} from "../db/client"
import {Prisma} from '@prisma/client';
import {createRouter} from "./context"
import {z} from "zod";

const jobSelect = Prisma.validator<Prisma.JobSelect>()({
	id: true,
	role: true,
	company_name: true,
});

export const jobRouter = createRouter()
	.query('all', {
		input: z.object({
			keywords: z.array(z.string()),
			number: z.number().optional(),
		}),
		async resolve({ input }) {
			const jobWhere = Prisma.validator<Prisma.JobWhereInput>()({
				job_skill: {
					some: {
						skill_name: {
							in: input.keywords
						}
					}
				}
			});
			return await prisma.job.findMany({
					select: jobSelect,
					where: jobWhere,
					take: input.number ? input.number : 20,
				}
			);
		}
	})