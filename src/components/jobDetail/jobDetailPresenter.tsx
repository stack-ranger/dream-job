import { trpc } from '~/utils/trpc'
import JobDetailView from '~/components/jobDetail/jobDetailView'

const JobDetailPresenter = ({ jobId }: { jobId: string }) => {
  const jobQuery = trpc.useQuery(['jobs.byId', { id: jobId }])
  return <JobDetailView job={jobQuery.data ? jobQuery.data : null} isLoading={jobQuery.isLoading} />
}

export default JobDetailPresenter
