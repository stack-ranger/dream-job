import { signIn } from 'next-auth/react'
import AuthModalView from './authModalView'
import React, { useCallback, useEffect, useState } from 'react'
import { trpc } from "~/utils/trpc";
import { useRouter } from 'next/router';


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
  const [resp, setResp] = useState<any>('')
  const [user, setUser] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  const registerUser = trpc.useMutation("registration.createUser");
  const router = useRouter()

  const isRegistration = (showReg: boolean) => {
    setIsRegistration(showReg)
  }
  const signUpUser = async() => {
    try{
      if(passwordRepeated === password) {
        setUser({
          email: email,
          password: password,
        })                      // D HÄR DET INTE FUNKAR  
        const response = await registerUser.mutateAsync({
          email: user.email,
          password: user.password,
        });
         // we can do stuff with this response, e.g. load a toast alert or something
        if (response?.status === 201) {
  
          
          console.log("Created User Successfully")
       //   setEmail('')
        //  setPassword('')
          // for signing in after successfull registration! 
          /*
          signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false,
            callbackUrl: `${window.location.origin}/protected`
          }); 
          */
          setIsRegistration(false)
          return response
        }
    }
  } 
    catch(err) {
      setError(true)
      return err
    }
  }
  const signInUser = async() => {
    try{
     setUser({
        email: email,
        password: password
      })
      const response: any = await signIn('credentials', {
        ...user,
        redirect: false,
      }); 
      response.error ? console.log(response) : console.log(response)
      setShowModal(false)
    }
    catch(err){
      setError(true)
      return err
    }
  }
  
  const onSubmit = async () => {
    if (isReg) {
      const response = await signUpUser()
    }else {
      const response = await signInUser()
      setResp(response)
    }
  }

  useEffect(() => {
       setUser({email: email, password: password})
  }, [email, password]);

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
      onSubmit={onSubmit}
      email={email}
      password={password}
      repeatedPassword={passwordRepeated}
    />
  )
}

export default AuthModalPresenter
