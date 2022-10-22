import SkillPlotView from './skillPlotView'
import useSkillCountStore from '~/stores/skillStore'

const SkillPlot = () => {
  const { skillsCount } = useSkillCountStore()
  const { jobSearch } = useSkillCountStore()

  return <SkillPlotView skills={skillsCount} jobSearch={jobSearch}/>
}

export default SkillPlot
