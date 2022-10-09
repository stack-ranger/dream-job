import create from 'zustand'
import { trpcClient } from '~/utils/trpc'

export interface Search {
  type: "job" | "skill" | string
  params: string
  createdAt: string
  link: string
}

interface HistoryStoreInterface {
  searches: Search[],
  isHistoryLoading: false,
  savedJobs: any[],
  isJobsLoading: false,
  fetchSearches: () => void
  fetchSavedJobs: () => void
  reset: () => void
  registerSearch: (query: string) => void
}

const useHistoryStore = create<HistoryStoreInterface>((set, get) => ({
  searches: [],
  isHistoryLoading: false,
  savedJobs: [],
  isJobsLoading: false,
  fetchSearches: async () => {
    let res = await trpcClient.query(
      'searches.all'
    )
    const processed = res?.map(i => ({
      type: new URLSearchParams(i.query).get("search") || "Not available",
      createdAt: i.createdAt.toLocaleString(),
      params: new URLSearchParams(i.query).getAll("skills").join(", ") || new URLSearchParams(i.query).get("role") || "Not available",
      link: i.query
    }))
    set({searches: processed ?? []})
  },
  fetchSavedJobs: () =>{

  },
  reset: () =>{ set({}) },
  registerSearch: (query: string) => {
    const res = trpcClient.mutation(
      'searches.save', {query: query}
    )
  }
}))

export default useHistoryStore