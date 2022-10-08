/**
 * Type representing the skill with the count of jobs it occurs in
 */
export type SkillCount = {
  name: string
  count: number
}

/**
 * Type returned from the raw query in the skill router
 */
export type SkillCountRaw = {
  name: string
  skill_count: number
}

/**
 * Type representing the zustand skill store
 */
export interface SkillStoreInterface {
  loading: boolean
  skillsCount: SkillCount[]
  fetchSkillsCount: (role: string) => void
}
