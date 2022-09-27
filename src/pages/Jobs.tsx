import React from "react";
import SkillSearchPresenter from "../components/skillSearch/skillSearchPresenter";
import {InferGetStaticPropsType} from "next";
import {PrismaClient} from "@prisma/client";
import JobListPresenter from "~/components/jobList/jobListPresenter";
import JobProvider from "~/context/jobContext";

const Jobs = ({skillList}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <div className="flex-col">
                <JobProvider>
                    <div className="pt-12 flex justify-center">
                        <SkillSearchPresenter skillList={skillList}/>
                    </div>
                    <JobListPresenter/>
                </JobProvider>
        </div>
    );
}

// generate skill list during build time (can be only done in pages)
export async function getStaticProps() {
    const prisma = new PrismaClient();
    const skills = await prisma.skill.findMany({
        select: {
            name: true
        }
    });
    const skillList = skills.map(skill => skill.name);
    return {
        props: {
            skillList: skillList
        },
    }
}

export default Jobs;