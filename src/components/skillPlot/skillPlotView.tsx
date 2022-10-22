import { useEffect } from 'react'
import { SkillCount } from '~/types/skill'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import { useTheme } from 'next-themes';

interface SkillPlotViewProps {
  skills: SkillCount[]
  jobSearch: string
}

export const SkillPlotView = ({ skills, jobSearch }: SkillPlotViewProps) => {
  const { theme } = useTheme()

  useEffect(() => {
    console.log(theme)
    const getCanvasElementById = (id: string): HTMLCanvasElement => {
      const canvas = document.getElementById(id);
  
      if (!(canvas instanceof HTMLCanvasElement)) {
          throw new Error(`The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`);
      }
  
      return canvas;
  }
    const canvas =  getCanvasElementById('chart')

    const config: any = {
      type: 'bar',
      data: {
        labels: skills.map((skill) => skill.name),
        datasets: [
          {
            data: skills.map((skill) => skill.count),
            backgroundColor: 'rgb(147 51 234)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            text: `Results for ${jobSearch}`,
            display: true,
            color: 'rgb(107 114 128)',
            font: {
              size: 20,
              family: 'sans-serif',
              weight: 10,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            offset: true,
            ticks: {
              min: 0,
              color: 'rgb(107 114 128)',
              font: {
                size: 14,
                family: 'sans-serif',
                weight: 1,
              },
            },
            grid: {
              display: false,
              borderColor: 'rgb(107 114 128)',
            },
          },

          y: {
            ticks: {
              min: 0,
              color: 'rgb(107 114 128)',
              borderColor: 'rgb(107 114 128)',
              font: {
                size: 14,
                family: 'sans-serif',
                weight: 1,
              },
              callback: function (tick: number, index: number) {
                return index % 2 !== 0 ? tick : ''
              },
            },
            grid: {
              display: false,
              borderColor: 'rgb(107 114 128)',
            },
          },
        },
      },
    }
    const chart = new Chart(canvas, config)
    return () => chart.destroy()
  }, [skills, jobSearch, theme])
  return (
    <div className={skills.length > 0 ? ' lg:flex sm:block' : 'hidden'}>
      <div className="mx-auto px-20 py-12 bg-white rounded-lg shadow-xl border border-rounded dark:bg-gray-800 dark:border-gray-500 sm:w-[30rem] md:w-[40rem] lg:w-[42rem] lg:mr-2">
        <canvas id="chart" className="h-72" />
      </div>
      <div className="block h-96 overflow-auto">
        <ul>
          {skills.map((skill, i) => (
            <div key={i} className="px-4 py-6 mb-2 shadow-lg block border border-rounded rounded-lg hover:transform dark:bg-gray-800 dark:border-gray-500 text-gray-500 sm:w-[30rem] md:w-[40rem] lg:w-[24rem] lg:mt-0">
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
                className={skill?.docs ? 'text-xs text-blue-700 hover:text-blue-800 overflow-auto' : 'text-black text-xs'}
              >
                {skill?.docs ? skill.docs : 'No Link Found.'}
              </a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SkillPlotView
