import Image from 'next/image'
import { InputChangeEventHandler } from '~/types/events'

const JobView = ({
  role,
  company_name,
  logo_url,
  getRandomColor,
  matchedSkills,
  onClick,
}: {
  role: string
  company_name: string
  logo_url: string
  getRandomColor: (company_name: string) => string | undefined
  matchedSkills: string[]
  onClick: (e: InputChangeEventHandler) => void
}) => (
  <div
    className="w-full max-w-sm hover:scale-105 bg-white rounded-lg border border-gray-200 shadow-md transition-opacity ease-in duration-1000 opacity-100"
    onClick={onClick}
  >
    <div className="flex flex-col items-center pb-3">
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
      <h6 className="text-sm text-gray-500">{company_name}</h6>
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

export default JobView
