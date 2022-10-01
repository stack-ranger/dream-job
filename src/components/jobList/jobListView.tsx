import JobPresenter from "./job/JobPresenter";
import JobSkeleton from "~/components/jobList/job/JobSkeleton";


const JobListView = ({jobs, loading}: {
    jobs: { role: string, company_name: string }[], loading: boolean;
}) => {
    console.log("loading", loading);
    return (
        <div className="flex pb-9">
            <div
                className="p-4 grid grid-cols-1 sm:grid-cols-1 sm:p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3 lg:p-8 xl:grid-cols-3 xl:p-10 gap-8 m-auto max-w-6xl">
                {loading && [...Array(10).keys()].map((i) => <JobSkeleton key={i}/>)}
                {!loading && jobs.map((job, i) => (
                    <JobPresenter key={i} job={job}/>
                ))}
            </div>
        </div>
    )
}

export default JobListView;