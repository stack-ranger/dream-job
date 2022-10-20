import Image from 'next/image'

const IconAnimationView = ({ icons, visible }: { icons: string[]; visible: boolean }) => {
  return (
    <>
      {visible && (
        <div className="overflow-hidden">
          <div className="flex -mx-4 animate-icons">
            {icons.map((icon, i) => (
              <div key={i} className={'self-start flex-none mx-4'}>
                <Image src={`/highResIcons/${icon}.svg`} width={60} height={60} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default IconAnimationView
