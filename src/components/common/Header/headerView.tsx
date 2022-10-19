//import { Navbar } from 'flowbite-react'
import LoginModal from '~/components/loginModal/loginModalPresenter'
import { Session } from 'next-auth'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const HeaderView = ({
  session,
  signOut,
  showModal,
  setShowModal,
}: {
  session: Session | null
  signOut: () => void
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState('Home')

  useEffect(() => {
    // @ts-ignore
    import('flowbite')
    setMounted(true)
  }, [])
  if (!mounted) return null
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }
  return (
    <div className="sticky top-0 z-50 dark:bg-gray-900 bg-white">
      {typeof window !== 'undefined' && (
        <>
          <nav className="border-gray-200 border-b-2 px-2 sm:px-4">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
              <a href="" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Stack Ranger
                </span>
                <span className="pl-2 text-md flex items-center">
                  <ChevronRightIcon className="w-5 h-5" /> {currentPage}
                </span>
              </a>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="flex flex-col items-center p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link href="/">
                      <a
                        className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent active:bg-blue-400"
                        aria-current="page"
                        onClick={() => setCurrentPage('Home')}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/history">
                      <a
                        className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        onClick={() => setCurrentPage('History')}
                      >
                        History
                      </a>
                    </Link>
                  </li>
                  {session ? (
                    <li>
                      <Link href="#">
                        <a
                          onClick={() => signOut()}
                          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Logout
                        </a>
                      </Link>
                    </li>
                  ) : (
                    <Link href="#">
                      <li>
                        <a
                          onClick={() => setShowModal(true)}
                          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                          Login
                        </a>
                      </li>
                    </Link>
                  )}
                  <button
                    className="w-8 h-8 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-blue-400 transition-all duration-300 focus:outline-none"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    aria-label="Toggle Dark Mode"
                  >
                    {theme === 'light' ? (
                      <MoonIcon className="text-blue-500 w-5 h-5" />
                    ) : (
                      <SunIcon className="text-blue-400 w-5 h-5" />
                    )}
                  </button>
                </ul>
              </div>
            </div>
          </nav>
          <LoginModal showModal={showModal} setShowModal={setShowModal} />
        </>
      )}
    </div>
  )
}
export default HeaderView
