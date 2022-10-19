import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '~/components/common/Header/headerPresenter'
import "react-toastify/dist/ReactToastify.css";

const LayoutView = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <div className='dark:bg-gray-900 h-screen'>
    <div className='dark:bg-gray-900 flex flex-col h-min-screen'>
    <Header />
      <main className='mt-6'>{children}</main>
      <ToastContainer/>
      </div>
      </div>
    </>
  )
}

export default LayoutView
