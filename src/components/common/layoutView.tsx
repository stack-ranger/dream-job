import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '~/components/common/Header/headerPresenter'
import "react-toastify/dist/ReactToastify.css";

const LayoutView = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <body className='dark:bg-gray-900 flex flex-col h-full'>
    <Header />
      <main className='mt-6'>{children}</main>
      <ToastContainer/>
      </body>
    </>
  )
}

export default LayoutView
