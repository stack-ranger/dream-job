import React from 'react'
import { SelectButton } from '../common/selectButton'
import JobListPresenter from '../jobList/jobListPresenter'
import JobSearchPresenter from '../jobSearch/jobSearchPresenter'
import SkillPlot from '../skillPlot/skillPlot'
import SkillSearchPresenter from '../skillSearch/skillSearchPresenter'
import IconAnimationPresenter from '~/components/homePage/iconAnimation/iconAnimationPresenter'

interface HomePageViewProps {
  searchSelected: 'job' | 'skill'
  jobSearchClick: () => void
  skillSearchClick: () => void
  skillList: string[]
  jobTitles: string[]
}

export default function HomePageView({
  searchSelected,
  jobSearchClick,
  skillSearchClick,
  skillList,
  jobTitles,
}: HomePageViewProps) {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="inline-flex rounded-md shadow-sm h-10" role="group">
          <SelectButton type="button" $isSelected={searchSelected === 'job'} $position="left" onClick={jobSearchClick}>
            Search Jobs
          </SelectButton>
          <SelectButton
            type="button"
            $isSelected={searchSelected === 'skill'}
            $position="right"
            onClick={skillSearchClick}
          >
            Search Skills
          </SelectButton>
        </div>
      </div>

      {searchSelected === 'job' && (
        <div className="flex-col">
          <div className="pt-12 flex justify-center">
            <SkillSearchPresenter skillList={skillList} />
          </div>
          <JobListPresenter />
        </div>
      )}

      {searchSelected === 'skill' && (
        <div className="flex-col">
          <div className="pt-12 flex justify-center">
            <JobSearchPresenter jobList={jobTitles} />
          </div>
          <div className="pt-12 flex justify-center">
            <SkillPlot />
          </div>
        </div>
      )}
      <IconAnimationPresenter />
    </>
  )
}
