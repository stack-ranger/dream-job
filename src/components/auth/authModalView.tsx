import { Modal, Label, TextInput, Button } from 'flowbite-react'
import { getStaticProps } from '~/pages'
import React, { SetStateAction, Dispatch } from 'react'

interface IAuthStates {
  /*
    email: string,
    password: string,
    repeatedPassword: string
    */
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setPasswordRepeated: Dispatch<SetStateAction<string>>
  // isRegistration: () => void;
  setCredentials: () => void
  isRegistration: (showReg: boolean) => void
  isReg: boolean
  showModal: boolean
  setShowModal: (show: boolean) => void
  onSignIn: () => void
}

const AuthModalView = (props: IAuthStates) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.setCredentials();
  };
  return (
    <Modal show={props.showModal} size="md" popup={true} onClose={() => props.setShowModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
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
            <TextInput id="email" placeholder="name@company.com" onChange={(e) => props.setEmail(e.target.value)} required={true} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" placeholder="************" onChange={(e) => props.setPassword(e.target.value)} required={true} />
          </div>
          {props.isReg && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeatpassword" value="Repeat password" />
              </div>
              <TextInput id="repeatpassword" type="password" placeholder="************" onChange={(e) => props.setPasswordRepeated(e.target.value)} required={true} />
            </div>
          )}
          <div className="w-full">
            <Button onClick={(handleSubmit)}>{props.isReg ? 'Sign up' : 'Sign in'}</Button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {props.isReg ? 'Already Registered? ' : 'Not Registered? '}
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
                onClick={() => {
                  props.isReg ? props.isRegistration(false) : props.isRegistration(true)
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
