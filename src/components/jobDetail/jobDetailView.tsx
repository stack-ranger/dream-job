import { JobInterface } from '~/types/job'
import getRandomColor from '~/utils/randColor'

import { HomeIcon, BriefcaseIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

import Image from 'next/image'
import SaveButton from '../common/saveButton'
import { InputChangeEventHandler } from '../../types/events'

const JobDetailView = ({
  job,
  isLoading,
  matchingSkills,
  isBookmarked,
  bookmarkJob,
  isJobButtonLoading,
  onClickBack,
}: {
  job: JobInterface | null
  isLoading: boolean
  matchingSkills: string[]
  isBookmarked: boolean
  bookmarkJob: () => void
  isJobButtonLoading: boolean
  onClickBack: (e: InputChangeEventHandler) => void
}) => {
  if (isLoading)
    return (
      <div className="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  if (!job) return <div>Error Job not found</div>
  return (
    <div className="flex justify-center gap-8 m-auto max-w-5xl p-5 sm:p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="relative">
        <div className="absolute left-0 rounded-lg text-white bg-blue-700 hover:bg-blue-800 py-2 px-3">
          <ArrowUturnLeftIcon className="h-5 w-5" onClick={onClickBack} />
        </div>
        <div className="absolute right-0">
          <SaveButton isSaved={isBookmarked} isLoading={isJobButtonLoading} onClickSave={bookmarkJob} />
          <button
            onClick={() => window.open(job.url, '_blank')}
            className={`py-2 px-3 text-xs font-medium text-center rounded-lg text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 hover:after:content-["Apply"] flex items-center`}
          >
            <BriefcaseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center">
          <div>
            <div className="text-center flex justify-center my-3">
              {job.logo_url == '' ? (
                <div
                  className={`${getRandomColor(
                    job.company_name
                  )}  flex items-center justify-center w-28 h-28 text-3xl font-bold text-white rounded-full`}
                >
                  {job.company_name.charAt(0)}
                </div>
              ) : (
                <Image
                  className="rounded-full"
                  src={job.logo_url}
                  alt={job.company_name}
                  width={120}
                  height={120}
                  placeholder={'blur'}
                  blurDataURL={'/loading.svg'}
                />
              )}
            </div>
            <p className="text-center">{job.role}</p>
            <div className="flex items-center justify-center pt-2 text-md font-medium">
              <HomeIcon className="h-5 w-5 gray-700 mr-2" aria-hidden="true" />
              {job.company_name}
            </div>
            {job.location && <div className="p-2 text-center text-sm">{job.location && job.location}</div>}
            <div className="p-1 text-center text-sm text-gray-800">Posted: {job.date_posted.toDateString()}</div>
            <div className="max-w-sm flex flex-wrap justify-center p-3">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className={`${
                    matchingSkills.includes(skill) ? 'bg-blue-200' : 'bg-gray-200'
                  } text-gray-600 text-xs font-semibold m-1 px-2.5 py-0.5 rounded hover:scale-110`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm pt-2" dangerouslySetInnerHTML={{ __html: job.text }} />
      </div>
    </div>
  )
}
export default JobDetailView
