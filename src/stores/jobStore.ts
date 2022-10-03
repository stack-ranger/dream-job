import create from 'zustand'
//import IStore from '~/types/store'
import { JobContextType, JobInterface } from '~/types/job';


interface JobStoreInterface {
    jobs: JobInterface[];
    skills: string[];
    loading: boolean;
    setJobs: (newJobs: JobInterface[]) => void;  
    setSkills: (newSkills: string[]) => void;
    setLoading: (newLoading: boolean) => void;
}

const useJobStore = create<JobStoreInterface>((set) => ({
    jobs: [],
    skills: [],
    loading: false,
    setJobs: (newJobs) => {
        set(() => ({
            jobs: [
                ...newJobs, 
            ],
        }));
    },
    setSkills: (newSkills) => {
        set(() => ({
            skills: [
                ...newSkills, 
            ],
        }));
    },
    setLoading: (newLoading) => {
        set(() => ({
            loading: newLoading,
        }));
    },
}))

export default useJobStore