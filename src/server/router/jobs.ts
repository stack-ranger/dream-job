import {prisma} from "../db/client"
import {Prisma} from '@prisma/client';
import {createRouter} from "./context"
import {z} from "zod";

export const jobRouter = createRouter()
	.query('all', {
		input: z.object({
			keywords: z.array(z.string()),
			number: z.number().optional(),
		}),
		async resolve({ input }) {
			const jobWhere = Prisma.validator<Prisma.JobWhereInput>()({
					JobSkill: {
						some: {
							skill_name: {
								in: input.keywords
							}
						}
					}
			});
			return await prisma.job.findMany({
					where: jobWhere,
					take: input.number ? input.number : 20,
					include: {
						Company: true,
						JobSkill: {
							select: {
								skill_name: true
							}
						}
					}
				}
			);
		}
	})