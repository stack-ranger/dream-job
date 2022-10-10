import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '~/components/common/Header/headerPresenter'
import "react-toastify/dist/ReactToastify.css";

const LayoutView = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ToastContainer/>
    </>
  )
}

export default LayoutView
