import JobView from './JobView'
import { JobInterface } from '~/types/job'
import { useRouter } from 'next/router'
import { InputChangeEventHandler } from '~/types/events'

const getRandomColor = (company_name: string) => {
  const randColors = [
    'bg-green-400',
    'bg-red-400',
    'bg-blue-400',
    'bg-orange-400, bg-yellow-400',
    'bg-violet-400',
    'bg-rose-400',
  ]
  return randColors[company_name.charCodeAt(0) % randColors.length]
}

const JobPresenter = ({ job, selectedSkills }: { job: JobInterface; selectedSkills: string[] }) => {
  const router = useRouter()
  const matchedSkills = job.skills.filter((skill: string) => selectedSkills.includes(skill))

  const handleClick = (e: InputChangeEventHandler) => {
    e.preventDefault()
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
