import React, { useEffect, useLayoutEffect, useState } from 'react'
import JobListView from './jobListView'
import useJobStore from '~/stores/jobStore'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import useScrollStore from '~/stores/scrollStore'

const JobListPresenter = () => {
  const scrollX = global?.window && window.scrollX
  const scrollY = global?.window && window.scrollY
  // useLayoutEffect not working with SSR
  const useBrowserLayoutEffect = process.browser ? useLayoutEffect : useEffect
  const { status } = useSession()
  const { jobs, loading, fetchJobs, jobsPerQuery, noJobsFound } = useJobStore()
  const { scrollPos, maxScrollPos, setMaxScrollPos } = useScrollStore()
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
    if (scrollHeight - scrollTop - 200 <= clientHeight) {
      if (tmpPosition > maxScrollPos) {
        setMaxScrollPos(scrollTop + clientHeight)
        await fetchJobs(status === 'authenticated')
      }
    }
  }

  if (typeof window !== 'undefined' && router.pathname !== '/history') window.onscroll = debounce(handleScroll, 10)

  useBrowserLayoutEffect(() => {
    window.scrollTo(scrollX, scrollY)
    // this is the case when coming back from detail page
    if (scrollPos != 0) {
      window.scrollTo(0, scrollPos)
    }
  })

  return (
    <JobListView
      jobs={jobs}
      loading={loading}
      skills={currentSkillSearch}
      jobsPerQuery={jobsPerQuery}
      noJobsFound={noJobsFound}
    />
  )
}

export default JobListPresenter
