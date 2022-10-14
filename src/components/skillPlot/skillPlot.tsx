import SkillPlotView from './skillPlotView'
import useSkillCountStore from '~/stores/skillStore'

/**
 * D3 skill plot
 * @param skills - skills to plot

 */
const SkillPlot = () => {
  const { skillsCount } = useSkillCountStore()
  
 

  return <SkillPlotView skills={skillsCount} />
}

export default SkillPlot
