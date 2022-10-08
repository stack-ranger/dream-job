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
   * @param skip number of jobs to skip, used for endless scrolling
   */
  fetchJobs: async (skip = 0) => {
    set({ loading: true })
    const store = get()
    const res = await trpcClient.query(
      'jobs.all',
      { keywords: get().skills, number: store.jobsPerQuery, skip: skip },
      { context: { enabled: false } }
    )
    set({ jobs: [...store.jobs, ...res] })
    set({ loading: false })
  },
  resetJobs: () => {
    set({ jobs: [] })
  },
  increaseOffset: () => {
    const store = get()
    set({ offset: store.offset + store.jobsPerQuery })
  },
  resetOffset: () => {
    set({ offset: 0 })
  },
  setScrollPos: (pos: number) => {
    set({ scrollPos: pos })
  },
}))

export default useJobStore
