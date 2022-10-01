import React, {useContext} from "react";
import JobListView from "./jobListView";
import {JobContext} from "~/context/jobContext";
import {JobContextType} from "~/types/job";

const JobListPresenter = () => {
    const { jobs } = useContext(JobContext) as JobContextType;
    const loading = jobs.length === 0;
    return (<JobListView jobs={jobs} loading={loading}/>);
}

export default JobListPresenter;
