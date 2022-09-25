import React, {useContext} from "react";
import JobListView from "./jobListView";
import {JobContext} from "~/context/jobContext";
import {JobContextType} from "~/types/job";

const JobListPresenter = () => {
    const { jobs } = useContext(JobContext) as JobContextType;
    return (<JobListView jobs={jobs} />);
}

export default JobListPresenter;
