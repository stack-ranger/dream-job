import create from 'zustand'
import { SkillStoreInterface } from '~/types/skill'
import { trpcClient } from '~/utils/trpc'

const useSkillCountStore = create<SkillStoreInterface>((set) => ({
  skillsCount: [],
  loading: false,
  jobSearch: '',
  // jobSearch
  fetchSkillsCount: async (role: string) => {
    set({ loading: true })
    const res = await trpcClient.query('skills.all', { role: role, number: 10 })
    set({ skillsCount: res ?? [] })
    set({ loading: false })
  },
  resetSkillCountStore: () => {
    set({skillsCount: []})
  },
  setStoreJobSearch: (role:string) =>  set({jobSearch: role}),
  
}))

export default useSkillCountStore
