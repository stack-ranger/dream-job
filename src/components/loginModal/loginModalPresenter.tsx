import { signIn } from 'next-auth/react'
import LoginModalView from '~/components/loginModal/loginModalView'

const LoginModalPresenter = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}) => {
  const onSignIn = () => signIn('google')
  return <LoginModalView showModal={showModal} setShowModal={setShowModal} onSignIn={onSignIn} />
}

export default LoginModalPresenter
