import { useEffect, useState } from 'react'
import { InputChangeEventHandler } from '~/types/events'
import JobSearchView from '~/components/jobSearch/jobSearchView'
import useSkillCountStore from '~/stores/skillStore'
import { useRouter } from 'next/router'
import useHistoryStore from '~/stores/historyStore'

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
  const { registerSearch } = useHistoryStore()

  const { fetchSkillsCount } = useSkillCountStore()

  useEffect(() => {
    const tmp = router?.query?.role
    const roleParam = (Array.isArray(tmp) ? undefined : tmp)
    if (roleParam) {
      setSearch(roleParam)
      fetchSkillsCount(roleParam)
    }
  }, [router?.query?.role])

  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    router.push({ pathname: '/', query: { role: search, search: "skill" } }, undefined, { shallow: true })
    registerSearch(`?search=skill&role=${search}`)
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
