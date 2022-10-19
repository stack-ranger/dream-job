import IconAnimationView from '~/components/homePage/iconAnimation/iconAnimationView'
import useJobStore from '~/stores/jobStore'
import useSkillCountStore from '~/stores/skillStore'

const iconArray = [
  'gcp',
  'redux',
  'python',
  'golang',
  'aws',
  'vue',
  'linux',
  'javascript',
  'nextjs',
  'postgres',
  'react',
  'angular',
  'tailwind',
  'django',
  'rust',
  'typescript',
]

const IconAnimationPresenter = ({ activeSearch }: { activeSearch: string }) => {
  const { jobs } = useJobStore()
  const { skillsCount } = useSkillCountStore()

  const visible =
    (activeSearch === 'job' && jobs.length === 0) || (activeSearch === 'skill' && skillsCount.length === 0)

  return <IconAnimationView icons={[...iconArray, ...iconArray]} visible={visible} />
}
export default IconAnimationPresenter
