import IconAnimationView from '~/components/homePage/iconAnimation/iconAnimationView'

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
  return <IconAnimationView icons={[...iconArray, ...iconArray]} />
}
export default IconAnimationPresenter
