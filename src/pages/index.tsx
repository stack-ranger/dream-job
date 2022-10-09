import type { NextPage } from 'next'
import { InferGetStaticPropsType } from 'next'
import { PrismaClient } from '@prisma/client'
import HomePagePresenter from '~/components/homePage/homePagePresenter'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  skillList,
  jobTitles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <HomePagePresenter jobTitles={jobTitles} skillList={skillList} />
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