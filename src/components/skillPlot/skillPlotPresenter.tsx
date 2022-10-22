import SkillPlotView from './skillPlotView'
import useSkillCountStore from '~/stores/skillStore'

const SkillPlot = () => {
  const { skillsCount, noSkillsFound, loading } = useSkillCountStore()
  const { jobSearch } = useSkillCountStore()

  return <SkillPlotView skills={skillsCount} jobSearch={jobSearch} noSkillsFound={noSkillsFound} loading={loading} />
}

export default SkillPlot
