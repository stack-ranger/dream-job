import React, { useEffect, useState } from 'react'
import JobListView from './jobListView'
import useJobStore from '~/stores/jobStore'
import { useRouter } from 'next/router'

const JobListPresenter = () => {
  const { jobs, loading } = useJobStore()
  const [currentSkillSearch, setCurrentSkillSearch] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const tmp = router?.query?.skills
    const skills: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
    setCurrentSkillSearch(skills)
  }, [router.query.skills])

  return <JobListView jobs={jobs} loading={loading} skills={currentSkillSearch} />
}

export default JobListPresenter
