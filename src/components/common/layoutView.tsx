import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '~/components/common/Header/headerPresenter'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '~/components/common/Footer/FooterView'

const LayoutView = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-gray-900 flex flex-col h-screen">
      <Header />
      <main className="mt-6 dark:bg-gray-900">{children}</main>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default LayoutView
