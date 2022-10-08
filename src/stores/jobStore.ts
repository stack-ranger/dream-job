import create from 'zustand'
import { AppRouter } from '~/server/router'
//import IStore from '~/types/store'
import { JobInterface } from '~/types/job'
import { trpc, trpcClient } from '~/utils/trpc'

interface JobStoreInterface {
  jobs: JobInterface[]
  skills: string[]
  loading: boolean
  setSkills: (newSkills: string[]) => void
  fetchJobs: (skills: string[]) => void
}

const useJobStore = create<JobStoreInterface>((set) => ({
  jobs: [],
  skills: [],
  loading: false,
  setSkills: (newSkills) => {
    set(() => ({
      skills: [...newSkills],
    }))
  },
  fetchJobs: async (skills: string[]) => {
    set({ loading: true })
    const res = await trpcClient.query('jobs.all', { keywords: skills, number: 10 }, { context: { enabled: false } })
    set({ jobs: res ?? [] })
    set({ loading: false })
  },
}))

export default useJobStore
