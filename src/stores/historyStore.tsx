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
  isJobsLoading: false,
  fetchSearches: () => void
  reset: () => void
  registerSearch: (loggedIn: boolean, query: string) => void
}

const useHistoryStore = create<HistoryStoreInterface>((set, get) => ({
  searches: [],
  isHistoryLoading: false,
  isJobsLoading: false,
  fetchSearches: async () => {
    const res = await trpcClient.query(
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
  reset: () =>{ set({}) },
  registerSearch: (loggedIn: boolean, query: string) => {
    if(loggedIn)
      trpcClient.mutation(
        'searches.save', {query: query}
      )
  }
}))

export default useHistoryStore