import { signIn } from 'next-auth/react'
import AuthModalView from './authModalView'
import React, { useEffect, useState } from 'react'
import { trpc } from "~/utils/trpc";


const AuthModalPresenter = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [error, setError] = useState(false)
  const [isReg, setIsRegistration] = useState(false)
  const [user, setUser] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  const registerUser = trpc.useMutation("registration.createUser");

  const isRegistration = (showReg: boolean) => {
    setIsRegistration(showReg)
  }

  const setCredentianls = async () => {
    if (isReg) {
      //Very basic check --> registration
      if(passwordRepeated === password) {
        setUser({
          email: email,
          password: password,
        })
        await registerUser.mutateAsync({
          id: email,
          email: email,
          password: password,
        });
      }else {
        setError(true)
      }
    }else {
      // If login
      setUser({
        email: email,
        password: password
      })
    }
  }
  useEffect(() => {
    if (user.email !== '' && user.email !== ''){
        console.log(user)

       // props.LoginUser(user)
    }
  }, [user]);

  const onSignIn = () => signIn('google')
  return (
    <AuthModalView
      isReg={isReg}
      isRegistration={isRegistration}
      showModal={showModal}
      setShowModal={setShowModal}
      onSignIn={onSignIn}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordRepeated={setPasswordRepeated}
      setCredentials={setCredentianls}
    />
  )
}

export default AuthModalPresenter
