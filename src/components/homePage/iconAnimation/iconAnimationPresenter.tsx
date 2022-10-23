import IconAnimationView from '~/components/homePage/iconAnimation/iconAnimationView'
import { useRouter } from 'next/router'

// icons to be shown in the animation
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

const IconAnimationPresenter = () => {
  const router = useRouter()
  const hasRouterQuery = Boolean(router.query.skills || router.query.role)

  return <IconAnimationView icons={[...iconArray, ...iconArray]} visible={!hasRouterQuery} />
}
export default IconAnimationPresenter
