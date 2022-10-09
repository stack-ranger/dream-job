import { useEffect, useState } from 'react'
import { InputChangeEventHandler } from '~/types/events'
import JobSearchView from '~/components/jobSearch/jobSearchView'
import useSkillCountStore from '~/stores/skillStore'
import { useRouter } from 'next/router'

const findMatches = (input: string, jobList: string[]) => {
  return jobList.filter((skill) => {
    const regex = new RegExp(input.replace(' ', ''), 'gi')
    return skill.match(regex)
  })
}

const JobSearchPresenter = ({ jobList }: { jobList: string[] }) => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const { fetchSkillsCount } = useSkillCountStore()

  useEffect(() => {
    const tmp = router?.query?.role
    const roleParam = (Array.isArray(tmp) ? undefined : tmp)

    if (roleParam) {
      fetchSkillsCount(roleParam)
    }
  }, [])

  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    await fetchSkillsCount(search)
    router.push({ pathname: '/', query: { role: search, search: "skill" } }, undefined, { shallow: true })
  }

  useEffect(() => {
    const trimmedSearch = search.trim()
    if (trimmedSearch.length) {
      const matches = findMatches(trimmedSearch || '', jobList)
      setSuggestions(matches.slice(0, Math.min(5, matches.length)))
    } else {
      setSuggestions([])
    }
  }, [search, jobList])

  return <JobSearchView search={search} setSearch={setSearch} suggestions={suggestions} onSearch={onSearch} />
}

export default JobSearchPresenter
