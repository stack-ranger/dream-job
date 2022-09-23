import JobPresenter from "./job/JobPresenter";


const JobListView = ({skills, setSkills, jobs, onSubmit}: {
                             skills: string;
                             setSkills: (skills: string) => void;
                             jobs: {role: string, company_name: string}[];
                             onSubmit: () => void; }) => {
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            <div className="flex pb-9">
                <div
                    className="p-4 grid grid-cols-1 sm:grid-cols-1 sm:p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3 lg:p-8 xl:grid-cols-3 xl:p-10 gap-8 m-auto max-w-6xl">
                    {jobs.length > 0 && jobs.map((job, i) => (
                        <JobPresenter key={i} job={job}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default JobListView;