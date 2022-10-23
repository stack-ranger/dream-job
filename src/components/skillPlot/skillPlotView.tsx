import { SkillCount } from '~/types/skill'
import Image from 'next/image'

interface SkillPlotViewProps {
  skills: SkillCount[]
  noSkillsFound: boolean
  loading: boolean
}

export const SkillPlotView = ({ skills, noSkillsFound, loading }: SkillPlotViewProps) => {
  return (
    <>
      {loading && skills.length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/loading.svg" alt="loading" width={150} height={150} />
        </div>
      )}
      {noSkillsFound && (
        <div className="flex justify-center text-center text-sm lg:text-lg font-medium text-gray-500 dark:text-gray-400">
          Sorry, we could not found any skills for this job ☹
        </div>
      )}
      <div className={skills.length > 0 ? 'overflow-auto px-2 lg:flex sm:block' : 'hidden'}>
        <div className="mx-auto px-4 py-2 bg-white rounded-lg shadow-xl border border-rounded dark:bg-gray-800 dark:border-gray-500 sm:w-[30rem] sm:px-8 lg:py-4 md:w-[40rem] md:px-14 md:py-8 lg:w-[42rem] lg:mr-2 lg:px-20 lg:py-12">
          <canvas id="chart" className="h-72" />
        </div>
        <div className="block h-96 overflow-auto">
          <ul>
            {skills.map((skill, i) => (
              <div
                key={i}
                className="bg-white mt-2 px-4 py-6 mb-2 shadow-lg block border border-rounded rounded-lg hover:transform dark:bg-gray-800 dark:border-gray-500 text-gray-500 sm:w-[30rem] md:w-[40rem] lg:w-[24rem] lg:mt-0"
              >
                <li className="flex justify-between items-center" key={i}>
                  <div className="capitalize">{skill.name}</div>
                  {skill.icon.length > 0 && (
                    <div className="h-12 w-12 relative">
                      <Image src={'/icons/' + skill.icon} alt={skill.icon} layout={'fill'} objectFit={'cover'} />
                    </div>
                  )}
                </li>
                <p className="text-sm mt-2">Link to Documentation:</p>
                <a
                  href={skill.docs}
                  className={
                    skill?.docs ? 'text-xs text-blue-700 hover:text-blue-800 overflow-auto' : 'text-black text-xs'
                  }
                >
                  {skill?.docs ? skill.docs : 'No Link Found.'}
                </a>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SkillPlotView
