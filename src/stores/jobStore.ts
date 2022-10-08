import create from 'zustand'
import { JobStoreInterface } from '~/types/job'
import { trpcClient } from '~/utils/trpc'

const useJobStore = create<JobStoreInterface>((set, get) => ({
  jobsPerQuery: 10,
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
}))

export default useJobStore
