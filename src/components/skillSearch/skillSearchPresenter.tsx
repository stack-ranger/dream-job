import { useEffect, useState } from 'react'
import SkillSearchView from './skillSearchView'
import { InputChangeEventHandler } from '~/types/events'
import useJobStore from '~/stores/jobStore'
import { useRouter } from 'next/router'

const findMatches = (input: string, skillList: string[]) => {
  return skillList.filter((skill) => {
    const regex = new RegExp(input.replace(' ', ''), 'gi')
    return skill.match(regex)
  })
}

const SkillSearchPresenter = ({ skillList }: { skillList: string[] }) => {
  const maxSkills = 5

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const { skills, setSkills, fetchJobs, resetJobs, resetOffset, setScrollPos } = useJobStore()
  const router = useRouter()

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const tmp = router?.query?.skills
    const skills: string[] = Array.isArray(tmp) ? tmp : tmp ? [tmp] : []
    setSkills(skills)
    // if link is used to fetch jobs, trigger initial fetch
    if (skills.length > 0) {
      fetchJobs()
    }
  }, [])

  const onSearch = async (e: InputChangeEventHandler) => {
    e.preventDefault()
    setScrollPos(0)
    resetOffset()
    resetJobs()
    fetchJobs()
    await router.push({ pathname: '/', query: { skills: skills } }, undefined, { shallow: true })
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
    if (e.key === 'Backspace' && !search.length && skills.length) {
      e.preventDefault()
      const skillsCopy = [...skills]
      setSkills(skillsCopy)
      setSearch(skillsCopy.pop() || '')
    }

    // Limit the number of tags to 5
    if (skills.length >= maxSkills) return

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
