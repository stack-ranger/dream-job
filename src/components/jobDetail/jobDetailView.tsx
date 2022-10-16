import { JobInterface } from '~/types/job'
import getRandomColor from '~/utils/randColor'

import { HomeIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/20/solid'

import Image from 'next/image'

const JobDetailView = ({
  job,
  isLoading,
  matchingSkills,
  isBookmarked,
}: {
  job: JobInterface | null
  isLoading: boolean
  matchingSkills: string[]
  isBookmarked: boolean
}) => {
  if (isLoading) return <div>Loading...</div>
  if (!job) return <div>Error Job not found</div>
  return (
    <div className="flex justify-center gap-8 m-auto max-w-4xl p-4 sm:p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="relative">
        <div className="absolute top-0 right-0 hover:scale-110">
          {isBookmarked ? <BookmarkSolid className="h-6 w-6" /> : <BookmarkIcon className="h-6 w-6" />}
        </div>
        <div className="flex justify-center">
          <div>
            <div className="text-center my-3">
              {job.logo_url == '' ? (
                <div
                  className={`${getRandomColor(
                    job.company_name
                  )} flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-full`}
                >
                  {job.company_name.charAt(0)}
                </div>
              ) : (
                <Image className="rounded-full" src={job.logo_url} alt={job.company_name} width={120} height={120} />
              )}
            </div>
            <p className="text-center bg-gray-50 p-1 rounded-lg">{job.role}</p>
            <div className="flex items-center justify-center pt-2 text-md font-medium">
              <HomeIcon className="h-5 w-5 gray-800 mr-2" aria-hidden="true" />
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
