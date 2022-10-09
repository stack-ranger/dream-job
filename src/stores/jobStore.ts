import create from 'zustand'
import { JobStoreInterface } from '~/types/job'
import { trpcClient } from '~/utils/trpc'

const useJobStore = create<JobStoreInterface>((set, get) => ({
  jobsPerQuery: 10,
  offset: 0,
  scrollPos: 0,
  jobs: [],
  skills: [],
  loading: false,
  setSkills: (newSkills) => {
    set(() => ({
      skills: [...newSkills],
    }))
  },
  /**
   * Fetch jobs from the API
   */
  fetchJobs: async () => {
    set({ loading: true })
    const store = get()
    const res = await trpcClient.query(
      'jobs.all',
      { keywords: get().skills, number: store.jobsPerQuery, skip: store.offset },
      { context: { enabled: false } }
    )
    set({ jobs: [...store.jobs, ...res] })
    set({ offset: store.offset + res.length })
    set({ loading: false })
  },
  resetJobs: () => {
    set({ jobs: [] })
  },
  resetOffset: () => {
    set({ offset: 0 })
  },
  setScrollPos: (pos: number) => {
    set({ scrollPos: pos })
  },
}))

export default useJobStore
