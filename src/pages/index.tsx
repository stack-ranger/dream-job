import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import React from "react";
import SkillSearchPresenter from "../components/skillSearch/skillSearchPresenter";
import {InferGetStaticPropsType} from "next";
import {PrismaClient} from "@prisma/client";
import JobListPresenter from "~/components/jobList/jobListPresenter";
import JobProvider from "~/context/jobContext";
import useStore from '~/store/store';
import { IStore } from '~/types/store'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({skillList}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data: session, status } = useSession()
  const handleClick = useStore(state => state.increaseCounter)
  const counter = useStore(state => state.counter) 
  
  if (status === 'loading') {
    return <main className="flex flex-col items-center pt-4">Loading...</main>
  }

  // const jobs = trpc.useQuery(["jobs.selected", { keywords: ["react", "typescript", "docker", "tailwind"] }]);
  // console.log(jobs);

  // const skills = trpc.useQuery(["skills.all", { role: "Frontend Developer", number: 20 }], {
  //   async onSuccess(data) {
  //     console.log(data);
  //   },
  // });
  

  return (
      <div className="flex-col">
            <button onClick={handleClick}>
                increment
            </button>
            <p>{counter}</p>
              <JobProvider>
                  <div className="pt-12 flex justify-center">
                      <SkillSearchPresenter skillList={skillList}/>
                  </div>
                  <JobListPresenter/>
              </JobProvider>
      </div>
  )
}

// generate skill list during build time (can be only done in pages)
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const skills = await prisma.skill.findMany({
      select: {
          name: true
      }
  });
  const skillList = skills.map(skill => skill.name);
  return {
      props: {
          skillList: skillList
      },
  }
}

export default Home
