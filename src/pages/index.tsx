import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import SkillSearchPresenter from '../components/skillSearch/skillSearchPresenter'
import { InferGetStaticPropsType } from 'next'
import { PrismaClient } from '@prisma/client'
import JobListPresenter from '~/components/jobList/jobListPresenter'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  skillList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { status } = useSession()

  if (status === 'loading') {
    return <main className="flex flex-col items-center pt-4">Loading...</main>
  }

  return (
    <div className="flex-col">
      <div className="pt-12 flex justify-center">
        <SkillSearchPresenter skillList={skillList} />
      </div>
      <JobListPresenter />
    </div>
  )
}

// generate skill list during build time (can be only done in pages)
export async function getStaticProps() {
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
    },
  }
}

export default Home
