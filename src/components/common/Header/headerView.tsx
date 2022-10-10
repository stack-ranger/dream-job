import { Navbar } from 'flowbite-react'
import LoginModal from '~/components/auth/authModalPresenter'
import { Session } from 'next-auth'

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
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <span className="ml-6 self-center whitespace-nowrap text-xl font-semibold dark:text-white">DreamJob</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/history">History</Navbar.Link>
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          {session ? (
            <Navbar.Link href="#" onClick={() => signOut()}>
              Logout
            </Navbar.Link>
          ) : (
            <Navbar.Link href="#" onClick={() => setShowModal(true)}>
              Login
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
export default HeaderView
