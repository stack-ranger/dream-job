import Header from '~/components/common/Header/headerPresenter'

const LayoutView = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default LayoutView
