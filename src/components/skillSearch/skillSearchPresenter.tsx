import { useEffect, useState } from 'react'
import SkillSearchView from './skillSearchView'
import { InputChangeEventHandler } from '~/types/events'
import useJobStore from '~/stores/jobStore'
import { useRouter } from 'next/router'
import useHistoryStore from '~/stores/historyStore'
import { useSession } from 'next-auth/react'
import useScrollStore from '~/stores/scrollStore'
import { toast } from 'react-toastify'

const findMatches = (input: string, skillList: string[]) => {
  return skillList.filter((skill) => {
    const regex = new RegExp(input.replace(' ', ''), 'gi')
    return skill.match(regex)
  })
}

const SkillSearchPresenter = ({ skillList }: { skillList: string[] }) => {
  const maxSkills = 5
  const { status } = useSession()

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const { jobs, skills, setSkills, fetchJobs, resetJobs, resetOffset, getAllSaved } = useJobStore()
  const { setScrollPos, setMaxScrollPos } = useScrollStore()
  const { registerSearch } = useHistoryStore()
  const router = useRouter()

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const tmp = router?.query?.skills
    const skills: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
    setSkills(skills)
    // if link is used to fetch jobs, trigger initial fetch, don't reset jobs
    if (skills.length > 0 && jobs.length === 0) {
      fetchJobs(status === 'authenticated')
    }
  }, [router?.query?.skills])

  useEffect(() => {
    if (status === 'authenticated') getAllSaved(false)
  }, [status])

  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    if (skills.length == 0) {
      toast.info('Select at least one skill', { autoClose: 2000 })
      return
    }
    setScrollPos(0)
    setMaxScrollPos(0)
    resetOffset()

    const tmp = router?.query?.skills
    const skillsParam: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
    // check if the skills are already in the url
    if (!(skillsParam.length === skills.length && skillsParam.every((skill, index) => skill === skills[index]))) {
      resetJobs()
    } else {
      toast.info('Already showing these skills', { autoClose: 2000 })
      return
    }
    await router.push({ pathname: '/', query: { skills: skills, search: 'job' } }, undefined, { shallow: true })
    registerSearch(status === 'authenticated', `?search=job${skills.map((s) => `&skills=${s}`).join('')}`)
  }

  useEffect(() => {
    const trimmedSearch = search.trim()
    if (skillList && trimmedSearch.length) {
      const matches = findMatches(trimmedSearch || '', skillList)
      setSuggestions(matches.slice(0, Math.min(10, matches.length)))
    } else {
      setSuggestions([])
    }
  }, [search])

  const appendSkill = (skill: string) => {
    if (skills.includes(skill)) {
      toast.info('Skill already selected', { autoClose: 2000 })
    }
    if (skillList.includes(skill) && !skills.includes(skill) && skills.length < maxSkills) {
      const newSkills: string[] = [...skills, skill]
      setSkills(newSkills)
      setSearch('')
    }
  }

  const removeSkill = (index: number) => {
    const filteredSkills: string[] = skills.filter((_, i) => i !== index)
    setSkills(filteredSkills)
  }

  const onSearchChange = (e: InputChangeEventHandler) => setSearch(e.target.value)

  const onKeyPress = (e: InputChangeEventHandler) => {
    if (e.key === 'Enter') {
      onSearch(e)
      return
    }
    if (e.key === 'Backspace' && !search.length && skills.length) {
      e.preventDefault()
      const skillsCopy = [...skills]
      const popped = skillsCopy.pop()
      setSkills(skillsCopy)
      setSearch(popped || '')
    }

    // Limit the number of tags to 5
    if (skills.length >= maxSkills) {
      toast.info(`You can only select ${maxSkills} skills`, { autoClose: 2000 })
      return
    }

    const searchTrimmed = search.trim()
    if (
      (e.key === ' ' || e.key === ',') &&
      searchTrimmed.length &&
      !skills.includes(searchTrimmed) &&
      skillList.includes(searchTrimmed)
    ) {
      e.preventDefault()
      const newSkills: string[] = [...skills, searchTrimmed]
      setSkills(newSkills)
      setSearch('')
    }
  }

  return (
    <SkillSearchView
      skills={skills}
      search={search}
      suggestions={suggestions}
      appendSkill={appendSkill}
      removeSkill={removeSkill}
      onKeyPress={onKeyPress}
      onSearchChange={onSearchChange}
      onSearch={onSearch}
    />
  )
}

export default SkillSearchPresenter
