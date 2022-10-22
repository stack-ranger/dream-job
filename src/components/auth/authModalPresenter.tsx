import { signIn } from 'next-auth/react'
import AuthModalView from './authModalView'
import React, { useEffect, useState } from 'react'
import { trpc } from '~/utils/trpc'
import { checkValidEmail, checkEmailLength, checkPasswordLength } from '~/utils/validator'
import { toast } from 'react-toastify'
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
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isReg, setIsRegistration] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [user, setUser] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  const registerUser = trpc.useMutation('registration.createUser')

  const onErrorReturned = (message: string) => {
    setError(true)
    setMessage(message)
    setLoading(false)
  }
  const isRegistration = (showReg: boolean) => {
    setIsRegistration(showReg)
  }
  const signUpUser = async () => {
    if (!checkEmailLength(email)) {
      onErrorReturned('Email length is too short.')
      return
    }
    if (passwordRepeated !== password) {
      onErrorReturned('Passwords do not match.')
      return
    }

    if (!checkPasswordLength(password) || !checkPasswordLength(passwordRepeated)) {
      onErrorReturned('Password length is too short.')
      return
    }
    setLoading(true)
    try {
        setUser({
          email: email,
          password: password,
        })
        const response = await registerUser.mutateAsync({
          email: user.email,
          password: user.password,
        })
        // we can do stuff with this response, e.g. load a toast alert or something
        if (response?.status === 201) {
          setMessage(response.message)
          setError(false)
          setLoading(false)
          setIsSuccessful(true)
          setIsRegistration(false)
          return response
        } else if (response?.status === 400) {
          onErrorReturned(response.message)
          return
        }
      
    } catch (err) {
      onErrorReturned('Sign up failed. Please try again.')
      return err
    }
  }

  const signInUser = async () => {
    if (!checkEmailLength(email)) {
      onErrorReturned('Email length is too short.')
      return
    }
    if (!checkValidEmail(email)) {
      onErrorReturned('Email format not valid.')
      return
    }
    if (!checkPasswordLength(password)) {
      onErrorReturned('Password length is too short.')
      return
    }
    setLoading(true)
    try {
      setUser({
        email: email,
        password: password,
      })
      const response = await signIn('credentials', {
        ...user,
        redirect: false,
      })
      if (response?.status === 200) {
        setError(false)
        setLoading(false)
        setShowModal(false)
        toast.info(`Welcome ${user.email}!\n You can now search and save job positions and explore trending tech stacks.`, { autoClose: 15000 })        
        return response
      }
      if (response?.status === 401) {
        onErrorReturned('Sign in failed. Please try again.')
        return
      }
    } catch (err) {
      onErrorReturned('Sign in failed. Please try again.')
      return err
    }
  }

  // Can we refactor this?
  const onSubmit = async () => {
    setIsSuccessful(false)
    if (isReg) {
      await signUpUser()
    } else {
      await signInUser()
    }
  }
  const dismissAlert = () => {
    if (isSuccessful) {
      setIsSuccessful(false)
    } else {
      setError(false)
    }
  }

  useEffect(() => {
    setUser({ email: email, password: password })
  }, [email, password])

  const onSignIn = () => signIn('google')
  return (
    <>
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
        error={error}
        message={message}
        loading={loading}
        dismissAlert={dismissAlert}
        isSuccessful={isSuccessful}
      />
    </>
  )
}

export default AuthModalPresenter
