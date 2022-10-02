import JobPresenter from "./job/JobPresenter";
import JobSkeleton from "~/components/jobList/job/JobSkeleton";
import {JobInterface} from "~/types/job";

const JobListView = ({jobs, loading, skills}: {
    jobs: JobInterface[], loading: boolean, skills: string[];
}) => {
    return (
        <div className="flex pb-9">
            <div
                className="p-4 grid grid-cols-1 sm:grid-cols-1 sm:p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3 lg:p-8 xl:grid-cols-3 xl:p-10 gap-8 m-auto max-w-6xl">
                {loading && [...Array(10).keys()].map((i) => <JobSkeleton key={i}/>)}
                {!loading && jobs.map((job, i) => (
                    <JobPresenter key={i} job={job} selectedSkills={skills}/>
                ))}
            </div>
        </div>
    )
}

export default JobListView;