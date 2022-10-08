type Job = {
  id: string
  role: string
  company_name: string
  company_num_employees: null
  employment_type: null
  location: null
  remote: boolean
  logo: string
  url: string
  text: string
  date_posted: Date
  source: string
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

interface JobWithKeywords extends Job {
  company_num_employees?: null
  keywords?: string[]
}
