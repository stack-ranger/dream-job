import { trpc } from '~/utils/trpc'
import JobDetailView from '~/components/jobDetail/jobDetailView'
import useJobStore from '~/stores/jobStore'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { JobInterface } from '~/types/job'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { InputChangeEventHandler } from '../../types/events'

const JobDetailPresenter = ({ jobId }: { jobId: string }) => {
  const { status } = useSession()
  const router = useRouter()
  const { jobs, skills, deleteJob, saveJob, isJobButtonLoading } = useJobStore()
  const [isThisJobButtonLoading, setIsThisJobButtonLoading] = useState(false)

  // look for the job in the store
  const [job, setJob] = useState(jobs.find((job) => job.id === jobId) as JobInterface)
  // if not found, fetch it from the server
  const { isLoading } = trpc.useQuery(['jobs.byId', { id: jobId }], { enabled: !job, onSuccess: setJob })

  const matchedSkills = job ? job.skills.filter((skill: string) => skills.includes(skill)) : []

  const bookmarkJob = async () => {
    if (status === 'authenticated') {
      setIsThisJobButtonLoading(true)
      if (job?.saved) {
        await deleteJob(job.id)
        setJob({ ...job, saved: false })
      } else {
        await saveJob(job.id)
        setJob({ ...job, saved: true })
      }
      setIsThisJobButtonLoading(false)
    } else {
      toast.warn('Login to save a job')
    }
  }

  const onClickBack = (e: InputChangeEventHandler) => {
    e.preventDefault()
    router.back()
  }

  return (
    <JobDetailView
      job={job || null}
      isLoading={job == null || isLoading}
      matchingSkills={matchedSkills}
      isBookmarked={job?.saved ?? false}
      bookmarkJob={bookmarkJob}
      isJobButtonLoading={isJobButtonLoading || isThisJobButtonLoading}
      onClickBack={onClickBack}
    />
  )
}

export default JobDetailPresenter
