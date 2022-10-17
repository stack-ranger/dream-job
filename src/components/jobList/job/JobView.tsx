import Image from 'next/image'
import { toast } from 'react-toastify';
import { SaveButton } from '~/components/common/saveButton'

const JobView = ({
  role,
  company_name,
  logo_url,
  getRandomColor,
  matchedSkills,
  isLogged,
  isSaved,
  saveJob,
  deleteJob,
  isJobButtonLoading,
}: {
  role: string
  company_name: string
  logo_url: string
  getRandomColor: (company_name: string) => string | undefined
  matchedSkills: string[]
  isLogged: boolean
  isSaved: boolean
  isJobButtonLoading: boolean
  saveJob: (id: string) => void
  deleteJob: (id: string) => void
}) => {
  return (
    <div className="w-full max-w-sm hover:scale-105 bg-white rounded-lg border border-gray-200 shadow-md transition-opacity ease-in duration-1000 opacity-100 dark:bg-gray-800 dark:border-gray-500">
      <div className="flex flex-col items-center pb-3 relative dark:bg-gray-800 dark:border-gray-500 rounded-lg">
        <SaveButton
          // @ts-ignore
          disabled={isJobButtonLoading}
          $isLoading={isJobButtonLoading}
          $isSaved={isSaved}
          // @ts-ignore
          onClick={isLogged ? (isSaved ? deleteJob : saveJob) : () => toast.warn("Login to save a job")}
        >
          {isJobButtonLoading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
          ) : isSaved ? (
            <span className="group-hover:hidden">Saved</span>
          ) : (
            <>Save</>
          )}
        </SaveButton>
        <div className="my-3">
          {logo_url == '' ? (
            <div
              className={`${getRandomColor(
                company_name
              )} flex items-center justify-center w-20 h-20 text-3xl font-bold text-white rounded-full`}
            >
              {company_name.charAt(0)}
            </div>
          ) : (
            <Image className="rounded-full" src={logo_url} alt={company_name} width={80} height={80} />
          )}
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900">{role}</h5>
        <span className="text-sm text-gray-500">{company_name}</span>
        <div className="pt-5">
          {matchedSkills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}


export default JobView
