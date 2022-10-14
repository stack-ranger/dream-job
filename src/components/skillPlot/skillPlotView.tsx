import * as d3 from 'd3'
import { useEffect } from 'react'
import { SkillCount } from '~/types/skill'

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
  return (
    <div id='chart' className="py-12 px-28 shadow-xl">
      <svg id='chart' width={width + 25} height={height}>
        <g width={width} height={height}>
          {skills.map((skill, i) => {
            const yOffset = yScale(skill.name) || 0
            return (
              <g key={i}>
                <rect
                  className={'fill-blue-300 hover:fill-blue-400'}
                  x={xScale(0)}
                  y={yOffset}
                  width={xScale(skill.count)}
                  height={yScale.bandwidth()}
                >
                </rect>

                <text
                  className={'text-lg text-black text-start font-medium flex justify-between'}
                  x={xScale(0.2)}
                  y={yScale.bandwidth() / 2 + yOffset}
                  alignmentBaseline="central"
                >
                  {skill.name}
                </text>
                <text
                  className={'text-lg text-black text-start font-medium flex justify-between'}
                  x={xScale(Math.max(skill.count))}
                  y={yScale.bandwidth() / 2 + yOffset}
                  alignmentBaseline="central"
                  textAnchor='ends'
                  fill='black'
                >
                  {skill.count}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default SkillPlotViewCopy
