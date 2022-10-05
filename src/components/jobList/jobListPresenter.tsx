import React, {useContext, useEffect, useState} from "react";
import JobListView from "./jobListView";
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'
import useJobStore from '~/stores/jobStore';
import { useRouter } from "next/router"
import {trpc} from "~/utils/trpc";

const JobListPresenter = () => {
    const { jobs, skills, loading, fetchJobs, setSkills } = useJobStore();
    const router = useRouter()
    
    useEffect(() => {
      const tmp = router?.query?.skills
      const skills: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
      fetchJobs(skills)
      setSkills(skills)
    }, [router.query.skills])

    return (<JobListView jobs={jobs} loading={loading} skills={skills}/>);
}



export default JobListPresenter;
