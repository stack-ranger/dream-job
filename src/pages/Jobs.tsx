import React from "react";
import SkillSearchPresenter from "../components/skillSearch/skillSearchPresenter";
import {InferGetStaticPropsType} from "next";
import {PrismaClient} from "@prisma/client";

const Jobs = ({ skillList } : InferGetStaticPropsType<typeof getStaticProps>) => {

    return(
        <div>
            <div className="flex">
                <SkillSearchPresenter skillList={skillList}/>
            </div>
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

export default Jobs
