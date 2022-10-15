import SkillPlotView from './skillPlotView'
import useSkillCountStore from '~/stores/skillStore'

const SkillPlot = () => {
  const { skillsCount } = useSkillCountStore()

  return <SkillPlotView skills={skillsCount} />
}

export default SkillPlot
