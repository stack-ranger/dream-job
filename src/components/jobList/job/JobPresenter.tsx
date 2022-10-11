import JobView from './JobView'
import { JobInterface } from '~/types/job'
import useJobStore from '~/stores/jobStore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

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
  const { status } = useSession()
  const [isThisJobButtonLoading, setIsThisJobButtonLoading] = useState(false)
  const { deleteJob, isJobButtonLoading, saveJob } = useJobStore()
  const matchedSkills = job.skills.filter((skill: string) => selectedSkills.includes(skill))

  const saveJobLoading = async () =>{
    setIsThisJobButtonLoading(true)
    await saveJob(job.id)
    setIsThisJobButtonLoading(false)
  }

  const deleteJobLoading = async () =>{
    setIsThisJobButtonLoading(true)
    await deleteJob(job.id)
    setIsThisJobButtonLoading(false)
  }

  return (
    <JobView
      role={job.role}
      company_name={job.company_name}
      getRandomColor={getRandomColor}
      logo_url={job.logo_url}
      matchedSkills={matchedSkills}
      deleteJob={deleteJobLoading}
      isLogged={status === "authenticated"}
      isJobButtonLoading={isJobButtonLoading || isThisJobButtonLoading}
      isSaved={job?.saved ?? false}
      saveJob={saveJobLoading}
    ></JobView>
  )
}
export default JobPresenter
