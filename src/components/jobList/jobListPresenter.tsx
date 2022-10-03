import React, {useContext} from "react";
import JobListView from "./jobListView";
import {JobContext} from "~/context/jobContext";
import {JobContextType} from "~/types/job";

const JobListPresenter = () => {
    const { jobs, loading, skills } = useContext(JobContext) as JobContextType;
    return (<JobListView jobs={jobs} loading={loading} skills={skills}/>);
}

export default JobListPresenter;
