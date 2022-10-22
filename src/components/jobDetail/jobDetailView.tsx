import { JobInterface } from '~/types/job'
import getRandomColor from '~/utils/randColor'
import { HomeIcon, BriefcaseIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { SaveButton } from '~/components/common/saveButton'
import Image from 'next/image'

const JobDetailView = ({
  job,
  isLoading,
  matchingSkills,
  isBookmarked,
  bookmarkJob,
  onClickBack,
  isJobButtonLoading,
}: {
  job: JobInterface | null
  isLoading: boolean
  matchingSkills: string[]
  isBookmarked: boolean
  bookmarkJob: () => void
  onClickBack: () => void
  isJobButtonLoading: boolean
}) => {
  if (isLoading)
    return (
      <div className="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  if (!job) return <div>Error Job not found</div>
  return (
    <div className="flex justify-center border rounded-lg gap-8 m-auto max-w-5xl p-5 sm:p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="relative">
        <div className="absolute left-0 rounded-lg text-white bg-blue-700 hover:bg-blue-800 py-2 px-3">
          <ArrowUturnLeftIcon className="h-5 w-5 cursor-pointer" onClick={onClickBack} />
        </div>
        <SaveButton
          // @ts-ignore
          disabled={isJobButtonLoading}
          $isLoading={isJobButtonLoading}
          $isSaved={isBookmarked}
          // @ts-ignore
          onClick={bookmarkJob}
        >
          {isJobButtonLoading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : isBookmarked ? (
            <span className="group-hover:hidden">Saved</span>
          ) : (
            <>Save</>
          )}
        </SaveButton>{' '}
        <button
          onClick={() => window.open(job.url, '_blank')}
          className="py-2 px-3 text-xs font-medium text-center absolute top-9 right-0 m-2 flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 "
        >
          <p className="pr-2">Apply</p>
          <BriefcaseIcon className="h-4 w-4" />
        </button>
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
            <div className="p-1 text-center text-sm text-gray-700">Posted: {job.date_posted.toDateString()}</div>
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
        <div className="text-sm pt-2 text-gray-500" dangerouslySetInnerHTML={{ __html: job.text }} />
      </div>
    </div>
  )
}
export default JobDetailView
