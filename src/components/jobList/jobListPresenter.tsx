import React, { useEffect, useState } from 'react'
import JobListView from './jobListView'
import useJobStore from '~/stores/jobStore'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'

const JobListPresenter = () => {
  const { jobs, loading, fetchJobs } = useJobStore()
  const [currentSkillSearch, setCurrentSkillSearch] = useState<string[]>([])
  const router = useRouter()

  // save the number of jobs already queried
  const [offset, setOffset] = useState(jobs.length)
  // save the max position of the scroll
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const tmp = router?.query?.skills
    const skills: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
    setCurrentSkillSearch(skills)
  }, [router.query.skills])

  async function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const tmpPosition = clientHeight + scrollTop
    if (scrollHeight - scrollTop <= clientHeight) {
      if (tmpPosition > position) {
        setPosition(scrollTop + clientHeight)
        await fetchJobs(offset)
        setOffset(offset + 20)
      }
    }
  }
  window.onscroll = debounce(handleScroll, 10)

  return <JobListView jobs={jobs} loading={loading} skills={currentSkillSearch} />
}

export default JobListPresenter
