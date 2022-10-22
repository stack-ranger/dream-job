import JobPresenter from './job/JobPresenter'
import JobSkeleton from '~/components/jobList/job/JobSkeleton'
import { JobInterface } from '~/types/job'

const JobListView = ({
  jobs,
  loading,
  skills,
  jobsPerQuery,
}: {
  jobs: JobInterface[]
  loading: boolean
  skills: string[]
  jobsPerQuery: number
}) => {
  return (
    <div className="flex">
      <div
        className={
          !loading && jobs.length === 0
            ? `pt-12`
            : `w-full p-4 grid grid-cols-1 sm:grid-cols-1 sm:p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3 lg:p-8 xl:grid-cols-3 xl:p-10 gap-8 m-auto max-w-6xl`
        }
      >
        {loading && jobs.length === 0 && [...Array(jobsPerQuery).keys()].map((i) => <JobSkeleton key={i} />)}
        {jobs.length > 0 && jobs.map((job, i) => <JobPresenter key={i} job={job} selectedSkills={skills} />)}
        {loading && jobs.length > 0 && [...Array(jobsPerQuery).keys()].map((i) => <JobSkeleton key={i} />)}
      </div>
    </div>
  )
}

export default JobListView
