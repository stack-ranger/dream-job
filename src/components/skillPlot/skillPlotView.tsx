import { useEffect, useState } from 'react'
import { SkillCount } from '~/types/skill'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import useSkillCountStore from '~/stores/skillStore'

interface SkillPlotViewProps {
  skills: SkillCount[]
}

/**
 *  D3 skill plot view
 * @param skills - skills to plot
 * @constructor
 */
export const SkillPlotView = ({ skills }: SkillPlotViewProps) => {
  const { jobSearch } = useSkillCountStore()
  useEffect(() => {
    // chart config


    var canvas: any = document.getElementById('chart')
    var canvas = canvas.getContext('2d')

    // Make API request from here
    const config: any = {
      type: 'bar',
      data: {
        labels: skills.map((skill) => skill.name),
        datasets: [
          {
            // label: `RAMP. Total:  ${skills.`,
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
            fontColor: 'black',
            fontFamily: 'Arial',

            font: {
              size: 16,
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
              color: 'black',
              min: 0,
              font: {
                size: 16,
              },
            },
            grid: {
              display: false,
            },
          },

          y: {
            ticks: {
              color: 'black',
              min: 0,
              font: {
                size: 16,
              },
              callback: function (tick: number, index: number, array: number[]) {
                return index % 2 !== 0 ? tick : ''
              },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    }
    const chart = new Chart(canvas, config)
    return () => chart.destroy()
  }, [skills])
  return (
   
    <div className={skills.length > 0 ? "flex justify-between" : 'hidden'}>

      <div className="mx-auto px-20 py-12 bg-white rounded-lg shadow-xl mr-10 border border-rounded">
         <canvas id="chart" className="h-72" />
      </div> 

      <div className="block h-96 overflow-auto">
        <ul>
          {skills.map((skill, i) => (
            <div key={i} className="px-4 py-6 mb-2 shadow-lg block border border-rounded rounded-lg hover:transform">
              <li className="flex justify-between items-center" key={i}>
                <div className="capitalize">{skill.name}</div>
                {skill.icon.length > 0 && (
                  <div className="h-12 w-12 relative">
                    <Image src={'/icons/' + skill.icon} alt={skill.icon} layout={'fill'} objectFit={'cover'} />
                  </div>
                )}
              </li>
              <p className='text-sm mt-2'>Link to Documentation:</p>
              <a href={skill.docs} className={skill?.docs ? "text-xs text-blue-700 hover:text-blue-800" : "text-black text-xs"}>
                {skill?.docs ? skill.docs : 'No Link Found'}
              </a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SkillPlotView
