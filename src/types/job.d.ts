type Job = {
    id: string
    role: string
    company_name: string
    company_num_employees: null
    employment_type: null
    location: null
    remote: boolean
    logo: string
    url: string
    text: string
    date_posted: Date
    source: string
}

export interface JobInterface {
    id: string;
    role: string;
    Company: {
        company_name: string;
        logo_url: string;
    },
    JobSkill: {
        skill_name: string;
    }[],
}

export type JobContextType = {
    jobs: JobInterface[];
    setJobs: (jobs: JobInterface[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    skills: string[];
    setSkills: (skills: string[]) => void;
};

interface JobWithKeywords extends Job {
    company_num_employees?: null
    keywords?: string[]
}
