import create from 'zustand'
import { JobStoreInterface } from '~/types/job'
import { trpcClient } from '~/utils/trpc'

const useJobStore = create<JobStoreInterface>((set, get) => ({
  jobsPerQuery: 10,
  offset: 0,
  jobs: [],
  skills: [],
  loading: false,
  isJobButtonLoading: false,
  savedJobs: [],
  setSkills: (newSkills) => {
    set(() => ({
      skills: [...newSkills],
    }))
  },
  /**
   * Fetch jobs from the API
   */
  fetchJobs: async (loggedIn) => {
    set({ loading: true })
    const store = get()
    const res = await trpcClient.query(
      'jobs.all',
      { keywords: get().skills, number: store.jobsPerQuery, skip: store.offset },
      { context: { enabled: false } }
    )

    let toUpdate = [...store.jobs, ...res]

    if (loggedIn) {
      set({ isJobButtonLoading: true })
      const resSavedJobs = await trpcClient.query('jobsProtected.all')
      // add saved to current jobs list
      const savedJobsIds = resSavedJobs?.map((i) => i.jobId)
      toUpdate = toUpdate.map((i) => {
        if (savedJobsIds?.includes(i.id)) return { ...i, saved: true }
        return i
      })
      set({ isJobButtonLoading: false })
    }

    set({ jobs: [...toUpdate] })
    set({ offset: store.offset + res.length })
    set({ loading: false })
  },
  resetJobs: () => {
    set({ jobs: [] })
  },
  resetOffset: () => {
    set({ offset: 0 })
  },
  resetJobStore: () => {
    set({ jobs: [], skills: [] })
  },
  deleteJob: async (id) => {
    await trpcClient.mutation('jobsProtected.delete', { jobId: id })
    const jobs = get().jobs
    const upJobs = jobs.map((i) => {
      if (i.id === id) return { ...i, saved: false }
      return i
    })
    set({ jobs: upJobs })
  },
  getAllSaved: async (replace: boolean) => {
    //don't show loading skeletons if only updating the save attribute (homepage)
    set({ isJobButtonLoading: true, loading: replace })
    const res = await trpcClient.query('jobsProtected.all')

    if (replace) {
      //replace job list with a new one (history page)
      set({
        jobs:
          [
            ...(res?.map((i) => ({
              ...i.job,
              saved: true,
              skills: [],
              company_name: i.job.Company.company_name,
              logo_url: i.job.Company.logo_url,
            })) ?? []),
          ] ?? [],
      })
    } else {
      // add saved to current jobs list
      const jobs = get().jobs
      const savedJobsIds = res?.map((i) => i.jobId)
      const upJobs = jobs.map((i) => {
        if (savedJobsIds?.includes(i.id)) return { ...i, saved: true }
        return i
      })

      set((state) => ({
        ...state,
        jobs: upJobs,
      }))
    }
    set({ isJobButtonLoading: false, loading: false })
  },
  saveJob: async (id) => {
    await trpcClient.mutation('jobsProtected.save', { jobId: id })
    const jobs = get().jobs
    const upJobs = jobs.map((i) => {
      if (i.id === id) return { ...i, saved: true }
      return i
    })
    set({ jobs: upJobs })
  },
  resetSavedJobs: () => {
    set({ savedJobs: [] })
  },
}))

export default useJobStore
