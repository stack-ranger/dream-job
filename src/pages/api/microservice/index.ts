import {PrismaClient, Prisma} from '@prisma/client'

// requires API_KEY to be set
const API_KEY = process.env.API_KEY
const AUTHORIZATION_HEADER = process.env.AUTHORIZATION_HEADER

// requires DATABASE_URL to be set 
const prisma = new PrismaClient();

/**
 * Fetch jobs from findwork.dev API
 */
const fetchJobs = async function () {

    // used as offset
    let pageCounter = 1;
    let invalidPage = false;
    let numberJobsFetched = 0;

    while (!invalidPage) {

        const start = new Date().getTime();

        const resp = await fetch(`https://findwork.dev/api/jobs/?page=${pageCounter}&order_by=date`, {
            headers: {"Authorization": `Token ${API_KEY}`}
        })
        const data: any = await resp.json();

        // check if we reached the last page
        if (data.detail && data.detail === "Invalid page.") {
            invalidPage = true;
            return;
        }
        pageCounter++;

        let job: JobWithKeywords;
        for (job of data.results) {
            const success = await writeJobToDb(job);
            if (!success) {
                console.log("Added " + numberJobsFetched + " jobs to database.");
                invalidPage = true;
                break;
            }
            numberJobsFetched++;
        }

        // make sure to not exceed the rate limit
        const end = new Date().getTime();
        const time = end - start;
        if (time < 1000) {
            await new Promise(resolve => setTimeout(resolve, 1000 - time));
        }
    }
}

/**
 * Write job to database with id as primary key
 * @param job to write into the database
 */
const writeJobToDb = async function (job: JobWithKeywords) {
    const skills = job.keywords;
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete job.keywords;
        await prisma.job.create({data: job});
        console.log("Added job " + job.role + " to database.");
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(
                    'Job with given ID already exists in database',
                )
                return false;
            }
        }
    }
    // create all the skill entries for the job
    for (const skill of skills) {
        try {
            await prisma.skill.create({data: {name: skill}});
        } catch (e) {}
    }
    // create all the job_skill entries for the job
    for (const skill of skills) {
        try {
            await prisma.jobSkill.create({data: {job_id: job.id, skill_name: skill}});
        } catch (e) {}
    }
    return true;
}

export default async function handler(req: any, res: any) {

    // check if request is authorized
    if (!req.headers.authorization || req.headers.authorization !== AUTHORIZATION_HEADER) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    await fetchJobs();
    res.status(200).json({message: "success"});
}