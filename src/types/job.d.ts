export interface JobInterface {
	id: string;
	role: string;
	company_name: string;
	keywords: string[];
}

export type JobContextType = {
	jobs: JobInterface[];
	updateJobs: (jobs: JobInterface[]) => void;
};
