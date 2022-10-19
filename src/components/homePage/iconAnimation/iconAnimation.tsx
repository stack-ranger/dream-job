import Image from 'next/image'

const iconArray = [
  'angular',
  'aws',
  'django',
  'gcp',
  'golang',
  'javascript',
  'linux',
  'nextjs',
  'postgres',
  'python',
  'react',
  'redux',
  'rust',
  'tailwind',
  'typescript',
  'vue',
]

const IconAnimation = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex -mx-4 animate-icons">
        {[...iconArray, ...iconArray].map((icon, i) => (
          <div key={i} className={'self-start flex-none mx-4'}>
            <Image src={`/highResIcons/${icon}.svg`} width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default IconAnimation
