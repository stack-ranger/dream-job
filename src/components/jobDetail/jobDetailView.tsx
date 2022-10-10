import { JobInterface } from '~/types/job'

const JobDetailView = ({ job, isLoading }: { job: JobInterface | null; isLoading: boolean }) => {
  if (isLoading) return <div>Loading job...</div>
  if (!job) return <div>Error Job not found</div>
  return (
    <div>
      <p>{job.role}</p>
      <p>{job.company_name}</p>
    </div>
  )
}
export default JobDetailView
