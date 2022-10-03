import React, { useState, ReactNode } from 'react';
import { JobContextType, JobInterface } from '~/types/job';

export const JobContext = React.createContext<JobContextType | null>(null);

type Props = {
    children: ReactNode;
};

const JobProvider: ({children}: Props) => JSX.Element = ({ children }: Props) => {
    const [jobs, setJobs] = useState<JobInterface[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    return <JobContext.Provider value={{ jobs, setJobs, loading, setLoading, skills, setSkills }}>
    {children}
    </JobContext.Provider>;
};

export default JobProvider;
