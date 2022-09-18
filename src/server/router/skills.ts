import { prisma } from "../db/client"
import { Prisma } from '@prisma/client';
import { createRouter } from "./context"
import { z } from "zod";

type Job = {
	role: string;
	text: string | null;
	keywords: string[];
}

const extractSkills = (jobs: Job[], number: number | null) => {

	let keyMap = new Map<string, number>();

	// add to number of analysed jobs
	keyMap.set("numberResults", jobs.length);

	jobs.forEach(job => {
		job.keywords.forEach(keyword => {
			const keyRef = keyMap.get(keyword)
			const count = keyRef ? keyRef + 1 : 1;
			keyMap.set(keyword, count);
		});
	});

	// sort the keymap by the number of times the keyword appears
	const sortedKeyMap = new Map([...keyMap.entries()].sort((a, b) => b[1] - a[1]));

	// return the top n keywords (+1 for the number of analysed jobs)
	if (number) {
		return [...sortedKeyMap.keys()].slice(0, number+1);
	}

	return sortedKeyMap;
}

const jobSelect = Prisma.validator<Prisma.jobsSelect>()({
	role: true,
	text: true,
	keywords: true,
});

export const skillRouter = createRouter()
	.query('all', {
		input: z.object({
			role: z.string(),
			number: z.number().min(1).nullish(),
		}),
		async resolve({ input }) {

			// conact role with % to allow for partial matches
			let roleConcat = input.role ? input.role.replace(" ", "&") : " ";

			const jobs: Job[] = await prisma.jobs.findMany({
				select: jobSelect,
				where: {
					OR: [
						{ role: { search: roleConcat } },
						{ text: { search: roleConcat } },
					],
				},
			});

			return extractSkills(jobs, input.number ? input.number : null);
		}
	})