import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useJobStore from '~/stores/jobStore'
import useSkillCountStore from '~/stores/skillStore'
import HomePageView from './homePageView'

export default function HomePagePresenter({ jobTitles, skillList }: { jobTitles: string[]; skillList: string[] }) {
  const router = useRouter()
  const { resetJobStore, setNoJobsFound } = useJobStore()
  const { resetSkillCountStore, setNoSkillsFound } = useSkillCountStore()
  const [searchSelected, setSearchSelected] = useState<'job' | 'skill'>('job')

  useEffect(() => {
    const tmp = router?.query?.search
    const searchParam = Array.isArray(tmp) ? '' : tmp
    if (searchParam === 'job' || searchParam === 'skill') setSearchSelected(searchParam)
  }, [router.query.search])

  const resetParams = () => {
    router.push({ pathname: '/', query: {} }, undefined, { shallow: true })
  }

  const jobSearchClick = () => {
    setSearchSelected('job')
    resetParams()
    resetJobStore()
    setNoSkillsFound(false)
  }

  const skillSearchClick = () => {
    setSearchSelected('skill')
    resetParams()
    resetSkillCountStore()
    setNoJobsFound(false)
  }

  return (
    <HomePageView
      jobSearchClick={jobSearchClick}
      skillSearchClick={skillSearchClick}
      searchSelected={searchSelected}
      jobTitles={jobTitles}
      skillList={skillList}
    />
  )
}
