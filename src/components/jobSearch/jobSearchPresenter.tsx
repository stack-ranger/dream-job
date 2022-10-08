import { useEffect, useState } from 'react'
import { InputChangeEventHandler } from '~/types/events'
import { trpc } from '~/utils/trpc'
import JobSearchView from '~/components/jobSearch/jobSearchView'
import useSkillCountstore from '~/stores/skillStore'

const findMatches = (input: string, jobList: string[]) => {
  return jobList.filter((skill) => {
    const regex = new RegExp(input.replace(' ', ''), 'gi')
    return skill.match(regex)
  })
}

const JobSearchPresenter = ({ jobList }: { jobList: string[] }) => {
  const [search, setSearch] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const { setSkillsCount } = useSkillCountstore()

  const { refetch } = trpc.useQuery(['skills.all', { role: search, number: 10 }], { enabled: false })
  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    const skillQuery = await refetch()
    if (skillQuery.data) {
      setSkillsCount(skillQuery.data)
    }
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
