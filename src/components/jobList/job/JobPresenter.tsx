import JobView from './JobView'
import { JobInterface } from '~/types/job'
import { useRouter } from 'next/router'
import { InputChangeEventHandler } from '~/types/events'
import getRandomColor from '~/utils/randColor'

const JobPresenter = ({ job, selectedSkills }: { job: JobInterface; selectedSkills: string[] }) => {
  const router = useRouter()
  const matchedSkills = job.skills.filter((skill: string) => selectedSkills.includes(skill))

  const handleClick = (e: InputChangeEventHandler) => {
    e.preventDefault()
    sessionStorage.setItem('scrollPosition', String(window.pageYOffset))
    router.push(`/detail/${job.id}`)
  }

  return (
    <JobView
      role={job.role}
      company_name={job.company_name}
      getRandomColor={getRandomColor}
      logo_url={job.logo_url}
      matchedSkills={matchedSkills}
      onClick={handleClick}
    ></JobView>
  )
}
export default JobPresenter
