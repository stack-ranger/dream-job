import React from "react";
import {InferGetStaticPropsType} from "next";
import SkillPlot from "~/components/skillPlot/skillPlot";
import JobSearchPresenter from "~/components/jobSearch/jobSearchPresenter";

const Skills = ({jobTitles}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <div className="flex-col">
                <div className="pt-12 flex justify-center">
                    <JobSearchPresenter jobList={jobTitles}/>
                </div>
                <div className="pt-12 flex justify-center">
                    <SkillPlot height={500} width={500}/>
                </div>
        </div>
    );
}

export async function getStaticProps() {
    // TODO Expand list of fetch common titles from database
    const commonJobTitles = [
        "Web Developer",
        "Software Engineer",
        "Software Developer",
        "Frontend Developer",
        "Network Engineer",
        "Java Developer",
        "Web Developer",
        "Junior Developer",
        "Full Stack Developer",
        "Software Architect",
        "Cloud Engineer",
    ]
    return {
        props: {
            jobTitles: commonJobTitles
        }
    }
}

export default Skills;

