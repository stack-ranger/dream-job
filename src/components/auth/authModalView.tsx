import { Modal, Alert, Label, TextInput, Button, Spinner } from 'flowbite-react'
import React, { SetStateAction, Dispatch } from 'react'

interface IAuthStates {
  email: string
  password: string
  repeatedPassword: string
  error: boolean
  loading: boolean
  message: string
  isReg: boolean
  showModal: boolean
  isSuccessful: boolean
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setPasswordRepeated: Dispatch<SetStateAction<string>>
  setShowModal: (show: boolean) => void
  isRegistration: (showReg: boolean) => void
  onSignIn: () => void
  onSubmit: () => void
  dismissAlert: () => void
}

const AuthModalView = (props: IAuthStates) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.onSubmit()
  }
  const onDismiss = () => {
    props.dismissAlert()
  }
  return (
    <Modal show={props.showModal} size="md" popup={true} onClose={() => props.setShowModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          {(props.error) && (
            <Alert color="failure" rounded={false} withBorderAccent={true} onDismiss={onDismiss}>
              <h3 className="text-xs font-xs text-red-700 dark:text-red-800">{props.message}</h3>
            </Alert>
          )} 
          {(props.isSuccessful) && (
            <Alert color="success" rounded={false} withBorderAccent={true} onDismiss={onDismiss}>
              <h3 className="text-xs font-xs text-green-700 dark:text-green-800">{props.message}</h3>
            </Alert>
          )} 
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {props.isReg ? 'Sign up to our platform' : 'Sign in to our platform'}
          </h3>
          <div className="w-full flex flex-row justify-center">
            <Button color="dark" onClick={props.onSignIn}>
              {props.isReg ? 'Sign up with Google' : 'Sign in with Google'}
            </Button>
          </div>
          <hr />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              required={true}
              minLength={6}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="************"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              required={true}
              minLength={6}
            />
          </div>
          {props.isReg && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeatpassword" value="Repeat password" />
              </div>
              <TextInput
                id="repeatpassword"
                type="password"
                placeholder="************"
                value={props.repeatedPassword}
                onChange={(e) => props.setPasswordRepeated(e.target.value)}
                required={true}
              />
            </div>
          )}
          <div className="w-full">
            <Button onClick={handleSubmit}>
              {props.loading ? <Spinner color="info" size="sm" /> : props.isReg ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {props.isReg ? 'Already Registered? ' : 'Not Registered? '}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
              onClick={() => {
                props.isReg ? (props.isRegistration(false), props.dismissAlert()) : (props.isRegistration(true), props.dismissAlert())
              }}
            >
              {props.isReg ? 'Sign in here.' : 'Sign up here.'}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AuthModalView
