import { useEffect, useState } from 'react'
import { InputChangeEventHandler } from '~/types/events'
import JobSearchView from '~/components/jobSearch/jobSearchView'
import useSkillCountStore from '~/stores/skillStore'

const findMatches = (input: string, jobList: string[]) => {
  return jobList.filter((skill) => {
    const regex = new RegExp(input.replace(' ', ''), 'gi')
    return skill.match(regex)
  })
}

const JobSearchPresenter = ({ jobList }: { jobList: string[] }) => {
  const [search, setSearch] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const { fetchSkillsCount } = useSkillCountStore()

  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    await fetchSkillsCount(search)
  }

  useEffect(() => {
    const trimmedSearch = search.trim()
    if (trimmedSearch.length) {
      const matches = findMatches(trimmedSearch || '', jobList)
      setSuggestions(matches.slice(0, Math.min(5, matches.length)))
    } else {
      setSuggestions([])
    }
  }, [search])

  return <JobSearchView search={search} setSearch={setSearch} suggestions={suggestions} onSearch={onSearch} />
}

export default JobSearchPresenter
