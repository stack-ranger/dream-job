import SkillPlotView from './skillPlotView'
import useSkillCountStore from '~/stores/skillStore'
import { useTheme } from 'next-themes'
import Chart from 'chart.js/auto'
import { useEffect } from 'react'

const SkillPlot = () => {
  const { skillsCount, noSkillsFound, loading } = useSkillCountStore()
  const { jobSearch } = useSkillCountStore()
  const { theme } = useTheme()

  useEffect(() => {
    console.log(theme)
    const getCanvasElementById = (id: string): HTMLCanvasElement => {
      const canvas = document.getElementById(id)

      if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error(
          `The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`
        )
      }
      return canvas
    }
    const canvas = getCanvasElementById('chart')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: any = {
      type: 'bar',
      data: {
        labels: skillsCount.map((skill) => skill.name),
        datasets: [
          {
            data: skillsCount.map((skill) => skill.count),
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
            color: theme === 'dark' ? '#d1d5db' : '#1f2937',
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
              color: theme === 'dark' ? '#d1d5db' : '#1f2937',
              font: {
                size: 14,
                family: 'sans-serif',
                weight: 1,
              },
            },
            grid: {
              display: false,
              borderColor: theme === 'dark' ? '#d1d5db' : '#1f2937',
            },
          },

          y: {
            ticks: {
              min: 0,
              color: theme === 'dark' ? '#d1d5db' : '#1f2937',
              borderColor: theme === 'dark' ? '#d1d5db' : '#1f2937',
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
              borderColor: theme === 'dark' ? '#d1d5db' : '#1f2937',
            },
          },
        },
      },
    }
    const chart = new Chart(canvas, config)
    return () => chart.destroy()
  }, [skillsCount, jobSearch, theme])

  return <SkillPlotView skills={skillsCount} noSkillsFound={noSkillsFound} loading={loading} />
}

export default SkillPlot
