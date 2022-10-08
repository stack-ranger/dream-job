import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import HeaderView from '~/components/common/Header/headerView'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const { data: session } = useSession()

  return <HeaderView session={session} showModal={showModal} setShowModal={setShowModal} signOut={signOut} />
}
export default Header
