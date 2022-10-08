import { useMemo } from 'react'
import * as d3 from 'd3'
import SkillPlotView from './skillPlotView'
import useSkillCountstore from '~/stores/skillStore'

/**
 * D3 skill plot
 * @param skills - skills to plot
 * @param height - height of the plot
 * @param width - width of the plot
 */
const SkillPlot = ({ height, width }: { height: number; width: number }) => {
  const { skillsCount } = useSkillCountstore()

  // useMemo to avoid re-rendering the plot
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(skillsCount.map((skill) => skill.name))
      .range([0, width])
      .padding(0.1)
  }, [skillsCount, width])

  const xScale = useMemo(() => {
    const [, max] = d3.extent(skillsCount.map((d) => d.count))
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, height])
  }, [height, skillsCount])

  return <SkillPlotView xScale={xScale} yScale={yScale} skills={skillsCount} width={width} height={height} />
}

export default SkillPlot
