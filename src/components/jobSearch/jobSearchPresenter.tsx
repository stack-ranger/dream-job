import { useEffect, useState } from 'react'
import { InputChangeEventHandler } from '~/types/events'
import JobSearchView from '~/components/jobSearch/jobSearchView'
import useSkillCountStore from '~/stores/skillStore'
import { useRouter } from 'next/router'
import useHistoryStore from '~/stores/historyStore'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const findMatches = (input: string, jobList: string[]) => {
  return jobList.filter((skill) => {
    const regex = new RegExp(input.replace(' ', ''), 'gi')
    return skill.match(regex)
  })
}

const JobSearchPresenter = ({ jobList }: { jobList: string[] }) => {
  const router = useRouter()
  const { status } = useSession()
  const [search, setSearch] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { registerSearch } = useHistoryStore()

  const { fetchSkillsCount, setStoreJobSearch } = useSkillCountStore()

  useEffect(() => {
    const tmp = router?.query?.role
    const roleParam = Array.isArray(tmp) ? undefined : tmp
    if (roleParam) {
      setSearch(roleParam)
      setStoreJobSearch(roleParam)
      fetchSkillsCount(roleParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query?.role])

  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    if (search.length == 0) {
      toast.info('Enter a job title', { autoClose: 2000 })
      return
    }
    if (search === router?.query?.role) {
      toast.info('Already showing the results', { autoClose: 2000 })
      return
    }
    router.push({ pathname: '/', query: { role: search, search: 'skill' } }, undefined, { shallow: true })
    registerSearch(status === 'authenticated', `?search=skill&role=${search}`)
  }

  const onKeyPress = (e: InputChangeEventHandler) => {
    if (e.key === 'Enter') {
      onSearch(e)
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
  }, [search, jobList])

  return (
    <JobSearchView
      search={search}
      setSearch={setSearch}
      suggestions={suggestions}
      onSearch={onSearch}
      onKeyPress={onKeyPress}
    />
  )
}

export default JobSearchPresenter
