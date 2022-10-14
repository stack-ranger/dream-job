import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { SkillCount } from '~/types/skill'
import Chart from 'chart.js/auto';
import useSkillCountStore from '~/stores/skillStore'

interface SkillPlotViewProps {
  skills: SkillCount[]
  xScale: d3.ScaleLinear<number, number> // length of the bars, scales automatically
  yScale: d3.ScaleBand<string> // the labels, scales automatically
  width: number
  height: number
}

/**
 *  D3 skill plot view
 * @param xScale - x scale
 * @param yScale - y scale
 * @param width - width of the plot
 * @param height - height of the plot
 * @param skills - skills to plot
 * @constructor
 */
export const SkillPlotViewCopy = ({ xScale, yScale, width, height, skills }: SkillPlotViewProps) => {
  const { jobSearch } = useSkillCountStore()

  useEffect(() => {

    // chart config
    var canvas : any = document.getElementById("chart");
    var canvas = canvas.getContext("2d");

    // Make API request from here
    const config:any = {
        type: 'bar',
        data: {
            labels: skills.map(skill => skill.name),
            datasets:[
                {
                   // label: `RAMP. Total:  ${skills.`,
                    data: skills.map(skill => skill.count),
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
                  font: {
                    size: 16
                  }
              },
              legend: {
                  display: false,
              },
          },
          scales: {
              x: 
                  {
                      offset: true,
                      ticks: {
                          color: 'black',
                          min: 0,
                          font: {
                            size: 16
                          }
                      },
                      grid: {
                          display:false
                      },

                  },
              
              y: 
                  {
                      ticks: {
                          color: 'black',
                          min: 0,
                          font: {
                            size: 16
                          },
                          callback: function(tick:number, index:number, array:number[]){
                              return index % 2 !== 0 ? tick : '';
                          }
                      },
                      grid: {
                          display:false
                      },
                  },
              
          },
      }
  }
    const chart = new Chart(canvas, config)
    return () => chart.destroy();
}, [skills])
return (
  <div className='flex justify-between'>
      <div className='mx-auto px-20 py-12 bg-white rounded-lg shadow-xl mr-10 border border-rounded'> 
        <canvas id='chart'className='h-72'/>
    </div>

    <div className='block h-72 overflow-auto'>
        <ul>
            {skills.map((skill, i) => (
              <div className='px-6 py-6 mb-2 shadow-lg block border border-rounded rounded-lg hover:transform' >
              <li
                className=""
                key={i}
              >
                {skill.name + ' counts: ' +skill.count + ' +'}
                {'icon goes here'}
              </li>
                <p className='text-xs'>description of stack</p>
                <a className='text-xs'>link to docs</a>

              </div>

            ))}
        </ul>
    </div>
  </div>
)
}


export default SkillPlotViewCopy
