import { JobInterface } from '~/types/job'
import { useRouter } from 'next/router'
import { InputChangeEventHandler } from '~/types/events'
import getRandomColor from '~/utils/randColor'
import useJobStore from '~/stores/jobStore'
import { useSession } from 'next-auth/react'
import JobView from '~/components/jobList/job/JobView'
import { toast } from 'react-toastify'

const JobPresenter = ({ job, selectedSkills }: { job: JobInterface; selectedSkills: string[] }) => {
  const { status } = useSession()
  const { deleteJob, saveJob } = useJobStore()

  const router = useRouter()
  const matchedSkills = job.skills.filter((skill: string) => selectedSkills.includes(skill))

  const handleClick = (e: InputChangeEventHandler) => {
    e.preventDefault()
    sessionStorage.setItem('scrollPosition', String(window.pageYOffset))
    router.push(`/detail/${job.id}`)
  }

  const onClickSave = (e: InputChangeEventHandler) => {
    e.stopPropagation()
    if (status === 'authenticated') {
      if (job?.saved) {
        deleteJob(job.id)
      } else {
        saveJob(job.id)
      }
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
    ></JobView>
  )
}
export default JobPresenter
