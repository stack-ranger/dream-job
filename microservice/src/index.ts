import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// load .env variables from parent directory
config({ path: './../../.env' })

const prisma = new PrismaClient();

type Job = {
	id: string
	role: string
	company_name: string
	company_num_employees: null
	employment_type: null
	location: null
	remote: boolean
	logo: string
	url: string
	text: string
	date_posted: Date
	keywords: string[]
	source: string
}

async function main() {

	const job: Job = {
		id: "Q4q2y2M",
		role: "Full-stack Developer",
		company_name: "CODECABIN_",
		company_num_employees: null,
		employment_type: null,
		location: null,
		remote: true,
		logo: "https://findwork-dev-images.s3.amazonaws.com/full/f914348f20683a831a740d95c9c77e2b2bd9100c.jpg",
		url: "https://findwork.dev/Q4q2y2M/full-stack-developer-at-codecabin",
		text: "This is the job description",
		date_posted: new Date("2022-09-12T15:09:05Z"),
		keywords: [
			"php",
			"wordpress"
		],
		source: "Weworkremotely"
	}

	await writeJobToDb(job);
}

const writeJobToDb = async function (job: Job) {
	await prisma.jobs.create({data: job});
}

main();