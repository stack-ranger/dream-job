/**
 * Type representing the skill with the count of jobs it occurs in
 */
export type SkillCount = {
  name: string
  count: number
}

/**
 * Type representing the zustand skill store
 */
export interface SkillStoreInterface {
  loading: boolean
  skillsCount: SkillCount[]
  fetchSkillsCount: (role: string) => void
}
