import create from 'zustand'
import { JobStoreInterface } from '~/types/job'
import { trpcClient } from '~/utils/trpc'

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
