import SkillPlotView from './skillPlotView'
import useSkillCountStore from '~/stores/skillStore'

const SkillPlot = () => {
  const { skillsCount, noSkillsFound } = useSkillCountStore()
  const { jobSearch } = useSkillCountStore()

  return <SkillPlotView skills={skillsCount} jobSearch={jobSearch} noSkillsFound={noSkillsFound} />
}

export default SkillPlot
