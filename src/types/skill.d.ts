/**
 * Type representing the skill with the count of jobs it occurs in
 */
export type SkillCount = {
  name: string
  count: number
  icon: string
  docs: string
}

/**
 * Type returned from the raw query in the skill router
 */
export type SkillCountRaw = {
  name: string
  skill_count: number
  icon: string
  docs: string
}

/**
 * Type representing the zustand skill store
 */
export interface SkillStoreInterface {
  loading: boolean
  skillsCount: SkillCount[]
  jobSearch: string
  noSkillsFound: boolean
  fetchSkillsCount: (role: string) => void
  resetSkillCountStore: () => void
  setStoreJobSearch: (role: string) => void
  setNoSkillsFound: (noSkillsFound: boolean) => void
}
