import { JobInterface } from '~/types/job'
import { useRouter } from 'next/router'
import { InputChangeEventHandler } from '~/types/events'
import getRandomColor from '~/utils/randColor'
import useJobStore from '~/stores/jobStore'
import { useSession } from 'next-auth/react'
import JobView from '~/components/jobList/job/JobView'
import { toast } from 'react-toastify'
import { useState } from 'react'

const JobPresenter = ({ job, selectedSkills }: { job: JobInterface; selectedSkills: string[] }) => {
  const { status } = useSession()
  const { deleteJob, saveJob, isJobButtonLoading } = useJobStore()
  const [isThisJobButtonLoading, setIsThisJobButtonLoading] = useState(false)

  const router = useRouter()
  const matchedSkills = job.skills.filter((skill: string) => selectedSkills.includes(skill))

  const handleClick = (e: InputChangeEventHandler) => {
    e.preventDefault()
    sessionStorage.setItem('scrollPosition', String(window.pageYOffset))
    router.push(`/detail/${job.id}`)
  }

  const onClickSave = async (e: InputChangeEventHandler) => {
    e.stopPropagation()
    if (status === 'authenticated') {
      setIsThisJobButtonLoading(true)
      if (job?.saved) {
        await deleteJob(job.id)
      } else {
        await saveJob(job.id)
      }
      setIsThisJobButtonLoading(false)
    } else {
      toast.warn('Login to save a job')
    }
  }

  return (
    <JobView
      role={job.role}
      company_name={job.company_name}
      getRandomColor={getRandomColor}
      logo_url={job.logo_url}
      matchedSkills={matchedSkills}
      onClick={handleClick}
      isSaved={job?.saved ?? false}
      onClickSave={onClickSave}
      isJobButtonLoading={isJobButtonLoading || isThisJobButtonLoading}
    ></JobView>
  )
}
export default JobPresenter
