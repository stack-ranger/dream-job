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

interface JobWithKeywords extends Job {
    keywords: string[]
}

type Skill = {
    name: string
}

type SkillCount = {
    name: string
    count: number
}

type JobSkill = {
    job_id: string
    skill_name: string
}
