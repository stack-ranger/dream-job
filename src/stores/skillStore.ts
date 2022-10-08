import create from 'zustand'
import { SkillCount, SkillStoreInterface } from '~/types/skill'


const useSkillCountstore = create<SkillStoreInterface>((set) => ({
  skillsCount: [],
  setSkillsCount: (newSkills) => {
    set(() => ({
      skillsCount: [...newSkills],
    }))
  },
}))

export default useSkillCountstore
