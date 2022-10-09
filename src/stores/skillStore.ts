import create from 'zustand'
import { SkillStoreInterface } from '~/types/skill'
import { trpcClient } from '~/utils/trpc'

const useSkillCountStore = create<SkillStoreInterface>((set) => ({
  skillsCount: [],
  loading: false,
  fetchSkillsCount: async (role: string) => {
    set({ loading: true })
    const res = await trpcClient.query('skills.all', { role: role, number: 10 })
    set({ skillsCount: res ?? [] })
    set({ loading: false })
  },
}))

export default useSkillCountStore
