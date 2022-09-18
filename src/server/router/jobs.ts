import { prisma } from "../db/client"
import { Prisma } from '@prisma/client';
import { createRouter } from "./context"
import { z } from "zod";


const jobSelect = Prisma.validator<Prisma.jobsSelect>()({
	id: true,
	role: true,
	company_name: true,
	keywords: true,
});



export const jobRouter = createRouter()
	.query('selected', {
		input: z.object({
			keywords: z.array(z.string()),
		}),
		async resolve({ input }) {

			const jobWhere = Prisma.validator<Prisma.jobsWhereInput>()({
				keywords: { hasEvery: input.keywords },
			});

			const jobs = await prisma.jobs.findMany({
				select: jobSelect,
				where: jobWhere,
			});
			return jobs;
		}
	})