import React, {useContext} from "react";
import JobListView from "./jobListView";
import {JobContextType} from "~/types/job";
import useJobStore from '~/stores/jobStore';

const JobListPresenter = () => {
    const { jobs, skills, loading } = useJobStore();
    return (<JobListView jobs={jobs} loading={loading} skills={skills}/>);
}

export default JobListPresenter;
