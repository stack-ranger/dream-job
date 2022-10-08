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

type Company = {
  company_name: string
  logo_url: string
}

export interface JobInterface {
  id: string
  role: string
  Company: Company
  JobSkill: {
    skill_name: string
  }[]
}

/**
 * Type representing the zustand job store
 */
export interface JobStoreInterface {
  jobs: JobInterface[]
  skills: string[]
  loading: boolean
  setSkills: (newSkills: string[]) => void
  fetchJobs: (skills: string[]) => void
}
