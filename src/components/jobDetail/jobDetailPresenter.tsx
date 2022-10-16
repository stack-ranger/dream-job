import { trpc } from '~/utils/trpc'
import JobDetailView from '~/components/jobDetail/jobDetailView'
import useJobStore from '~/stores/jobStore'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { JobInterface } from '~/types/job'
import { useSession } from 'next-auth/react'

const JobDetailPresenter = ({ jobId }: { jobId: string }) => {
  const { status } = useSession()
  const { jobs, skills, deleteJob, saveJob } = useJobStore()
  // look for the job in the store
  const [job, setJob] = useState(jobs.find((job) => job.id === jobId) as JobInterface)
  // if not found, fetch it from the server
  const { isLoading } = trpc.useQuery(['jobs.byId', { id: jobId }], { enabled: !job, onSuccess: setJob })

  const matchedSkills = job ? job.skills.filter((skill: string) => skills.includes(skill)) : []

  const bookmarkJob = () => {
    if (status === 'authenticated') {
      if (job?.saved) {
        deleteJob(job.id)
        setJob({ ...job, saved: false })
      } else {
        saveJob(job.id)
        setJob({ ...job, saved: true })
      }
    } else {
      toast.warn('Login to save a job')
    }
  }

  return (
    <JobDetailView
      job={job || null}
      isLoading={job == null || isLoading}
      matchingSkills={matchedSkills}
      isBookmarked={job?.saved ?? false}
      bookmarkJob={bookmarkJob}
    />
  )
}

export default JobDetailPresenter
