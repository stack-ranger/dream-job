import { signIn } from 'next-auth/react'
import AuthModalView from './authModalView'
import React, { useEffect, useState } from 'react'
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

  const setCredentianls = async () => {
    console.log(isReg)
    if (isReg) {
      //Very basic check --> registration
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
          /*
          signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false,
            callbackUrl: `${window.location.origin}/protected`
          }); 
          */
          setIsRegistration(false)
        }
        
      }else {
        setError(true) //set error: user already exists try console.log(response)
      }
    }else {
      // If login
      setUser({
        email: email,
        password: password
      })
      console.log("från login", user)
      const response = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
       /* callbackUrl: `${window.location.origin}/` */
      }); 
      console.log(response)
      router.push('/protected')
    }
  }
  useEffect(() => {
    console.log(isReg)

    if (user.email !== '' && user.email !== ''){
        console.log(user)

       // props.LoginUser(user)
    }
  }, [isReg]);

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
