import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import SkillSearchPresenter from '../components/skillSearch/skillSearchPresenter'
import { InferGetStaticPropsType } from 'next'
import { PrismaClient } from '@prisma/client'
import JobListPresenter from '~/components/jobList/jobListPresenter'
import JobSearchPresenter from '~/components/jobSearch/jobSearchPresenter'
import SkillPlot from '~/components/skillPlot/skillPlot'
import { useRouter } from 'next/router'
import useJobStore from '~/stores/jobStore'
import { useEffect, useState } from 'react'
import useSkillCountStore from '~/stores/skillStore'
import { SelectButton } from '~/components/common/selectButton'



const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  skillList,
  jobTitles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { resetJobStore } = useJobStore()
  const { resetSkillCountStore } = useSkillCountStore()
  const { status } = useSession()

  // why ['job', 'skill'].includes(searchParam) ? searchParam : 'job' is not working?
  const [searchSelected, setSearchSelected] = useState<'job' | 'skill'>('job')
  
  useEffect(()=>{
    const tmp = router?.query?.search
    const searchParam = (Array.isArray(tmp) ? "" : tmp)
    if(searchParam === "job" || searchParam === "skill")
      setSearchSelected(searchParam)
  }, [router.query.search])

  if (status === 'loading') {
    return <main className="flex flex-col items-center pt-4">Loading...</main>
  }

  const resetParams = () => {
    router.push({ pathname: '/', query: {} }, undefined, { shallow: true })
  }

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="inline-flex rounded-md shadow-sm h-10" role="group">
          <SelectButton
            type="button"
            $isSelected={searchSelected === 'job'}
            $position="left"
            onClick={() => {
              setSearchSelected('job')
              resetParams()
              resetJobStore()
            }}
          >
            Search Jobs
          </SelectButton>
          <SelectButton
            type="button"
            $isSelected={searchSelected === 'skill'}
            $position="right"
            onClick={() => {
              setSearchSelected('skill')
              resetParams()
              resetSkillCountStore()
            }}
          >
            Search Skills
          </SelectButton>
        </div>
      </div>

      {searchSelected === 'job' && (
        <div className="flex-col">
          <div className="pt-12 flex justify-center">
            <SkillSearchPresenter skillList={skillList} />
          </div>
          <JobListPresenter />
        </div>
      )}

      {searchSelected === 'skill' && (
        <div className="flex-col">
          <div className="pt-12 flex justify-center">
            <JobSearchPresenter jobList={jobTitles} />
          </div>
          <div className="pt-12 flex justify-center">
            <SkillPlot height={500} width={500} />
          </div>
        </div>
      )}
    </>
  )
}

// generate skill list during build time (can be only done in pages)
export async function getStaticProps() {
  // TODO Expand list of fetch common titles from database
  const commonJobTitles = [
    'Web Developer',
    'Software Engineer',
    'Software Developer',
    'Frontend Developer',
    'Network Engineer',
    'Java Developer',
    'Web Developer',
    'Junior Developer',
    'Full Stack Developer',
    'Software Architect',
    'Cloud Engineer',
  ]
  const prisma = new PrismaClient()
  const skills = await prisma.skill.findMany({
    select: {
      name: true,
    },
  })
  const skillList = skills.map((skill) => skill.name)
  return {
    props: {
      skillList: skillList,
      jobTitles: commonJobTitles,
    },
  }
}

export default Home
