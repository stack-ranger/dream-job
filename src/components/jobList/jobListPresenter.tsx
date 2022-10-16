import React, { useEffect, useState } from 'react'
import JobListView from './jobListView'
import useJobStore from '~/stores/jobStore'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'

const JobListPresenter = () => {
  const { status } = useSession()
  const { jobs, loading, fetchJobs, jobsPerQuery, scrollPos, setScrollPos } = useJobStore()
  const [currentSkillSearch, setCurrentSkillSearch] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const tmp = router?.query?.skills
    const skills: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
    setCurrentSkillSearch(skills)
  }, [router.query.skills])

  async function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const tmpPosition = clientHeight + scrollTop
    if (scrollHeight - scrollTop <= clientHeight) {
      if (tmpPosition > scrollPos) {
        setScrollPos(scrollTop + clientHeight)
        await fetchJobs(status === "authenticated")
      }
    }
  }

  // restore scroll position after clicking on a job
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition')
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])

  if (typeof window !== 'undefined') window.onscroll = debounce(handleScroll, 10)

  return <JobListView jobs={jobs} loading={loading} skills={currentSkillSearch} jobsPerQuery={jobsPerQuery} />
}

export default JobListPresenter
