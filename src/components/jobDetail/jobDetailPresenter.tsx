import { trpc } from '~/utils/trpc'
import JobDetailView from '~/components/jobDetail/jobDetailView'
import useJobStore from '~/stores/jobStore'
import { useState } from 'react'
import { JobInterface } from '~/types/job'

const JobDetailPresenter = ({ jobId }: { jobId: string }) => {
  const { jobs } = useJobStore()
  // look for the job in the store
  const [job, setJob] = useState(jobs.find((job) => job.id === jobId) as JobInterface)
  // if not found, fetch it from the server
  const { isLoading } = trpc.useQuery(['jobs.byId', { id: jobId }], { enabled: !job, onSuccess: setJob })

  return <JobDetailView job={job || null} isLoading={job == null || isLoading} />
}

export default JobDetailPresenter
