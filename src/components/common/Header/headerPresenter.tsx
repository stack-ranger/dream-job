import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import HeaderView from '~/components/common/Header/headerView'
import { useTheme } from 'next-themes'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState('Home')
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  // know issue with flowbite
  useEffect(() => {
    // @ts-ignore
    import('flowbite')
    setMounted(true)
    if (theme === 'system') setTheme('light')
    setMounted(true)
  }, [setTheme, theme])

  const switchTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  if (!mounted) return null

  return (
    <HeaderView
      session={session}
      showModal={showModal}
      setShowModal={setShowModal}
      signOut={signOut}
      switchTheme={switchTheme}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      theme={theme || 'dark'}
    />
  )
}
export default Header
