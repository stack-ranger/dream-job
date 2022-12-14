import React from 'react'
import { SelectButton } from '../common/selectButton'
import JobListPresenter from '../jobList/jobListPresenter'
import JobSearchPresenter from '../jobSearch/jobSearchPresenter'
import SkillPlot from '../skillPlot/skillPlotPresenter'
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
      <div className="flex flex-col py-6">
        <h1 className="pb-3 text-center font-black text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          The stack matters!
        </h1>
        <h2 className="text-center text-sm lg:text-lg font-bold text-gray-500 dark:text-gray-400">
          {searchSelected === 'job'
            ? 'Tell us with which stack want to work with and we will find the jobs for you.'
            : 'Tell us about the job you are interested in and we will find the most relevant stack for you.'}
        </h2>
      </div>
      <div className="flex flex-row justify-center">
        <div className="inline-flex rounded-md shadow-sm h-10" role="group">
          <SelectButton type="button" $isSelected={searchSelected === 'job'} $position="left" onClick={jobSearchClick}>
            Add Skills
          </SelectButton>
          <SelectButton
            type="button"
            $isSelected={searchSelected === 'skill'}
            $position="right"
            onClick={skillSearchClick}
          >
            Add Jobs
          </SelectButton>
        </div>
      </div>

      {searchSelected === 'job' && (
        <div className="flex-col">
          <div className="pt-12 flex justify-center w-max-96">
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
      <div className="pt-28">
        <IconAnimationPresenter />
      </div>
    </>
  )
}
