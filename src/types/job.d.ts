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

/**
 * Type representing the job how it is used in the frontend
 */
export interface JobInterface {
  id: string
  role: string
  Company: Company
  skills: string[]
  company_name: string
  logo_url: string
  text: string
  date_posted: Date
  source: string
  location: string
  url: string
  saved?: boolean
}

/**
 * Type representing the zustand job store
 */
export interface JobStoreInterface {
  jobsPerQuery: number
  offset: number
  jobs: JobInterface[] | Job[]
  skills: string[]
  loading: boolean
  isJobButtonLoading: boolean
  noJobsFound: boolean
  savedJobs: JobInterface[]
  setSkills: (newSkills: string[]) => void
  fetchJobs: (loggedIn: boolean) => void
  resetJobs: () => void
  resetOffset: () => void
  resetJobStore: () => void
  getAllSaved: (replace: boolean) => void
  saveJob: (id: string) => void
  deleteJob: (id: string) => void
  resetSavedJobs: () => void
  setNoJobsFound: (value: boolean) => void
}
