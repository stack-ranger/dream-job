import { signIn } from 'next-auth/react'
import AuthModalView from './authModalView'
import React, { useEffect, useState } from "react";


const AuthModalPresenter = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [user, setUser] = useState<{
    email: string;
    password: string;
    passwordRepeated: string;
  }>({
    email: "",
    password: "",
    passwordRepeated: "",
  });
  const [isReg, setIsRegistration] = useState(false)
  const [isLog, setIsLogin] = useState(true)

  const isRegistration = (showReg: boolean) => {
    setIsRegistration(showReg)
  }
  useEffect(() => {
    console.log("så här förändras isreg:", isReg)
    //console.log(isLog)
  })
  const onSignIn = () => signIn('google')
  return <AuthModalView isReg={isReg} isRegistration={isRegistration} showModal={showModal} setShowModal={setShowModal} onSignIn={onSignIn} />
}

export default AuthModalPresenter
