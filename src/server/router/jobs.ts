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
		async resolve() {
			const jobs = await prisma.jobs.findMany({
				select: jobSelect
			});
			return jobs;
		}
	})