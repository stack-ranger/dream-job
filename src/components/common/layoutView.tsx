import { ReactNode } from 'react'
import Header from '~/components/common/Header/headerPresenter'

const LayoutView = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default LayoutView
