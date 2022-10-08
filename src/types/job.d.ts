/**
 * This type should be only used for fetching jobs from the findwork.dev API
 */
type RawJob = {
  id: string
  role: string
  company_name: string
  company_num_employees?: null
  employment_type?: null
  location?: null
  remote?: boolean
  logo?: string
  url: string
  text: string
  date_posted: Date
  source?: string
  keywords?: string[]
}

/**
 * This type is representing a job in the database.
 * Add additional fields here if needed for e.g. detail view.
 */
export interface JobInterface {
  id: string
  role: string
  Company: {
    company_name: string
    logo_url: string
  }
  JobSkill: {
    skill_name: string
  }[]
}

/**
 * Type representing the zustand job store
 */
export interface JobStoreInterface {
  jobsPerQuery: number
  offset: number
  scrollPos: number
  jobs: JobInterface[]
  skills: string[]
  loading: boolean
  setSkills: (newSkills: string[]) => void
  fetchJobs: (skip?: number) => void
  resetJobs: () => void
  increaseOffset: () => void
  resetOffset: () => void
  setScrollPos: (pos: number) => void
}
