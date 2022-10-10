import { Modal, Label, TextInput, Button } from 'flowbite-react'
import Link from 'next/link'
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
  setRegistration: () => void
}

const AuthModalView = ({
  isRegistration,
  isReg,
  showModal,
  setShowModal,
  onSignIn,
}: {
  isRegistration: (showReg: boolean) => void
  isReg: boolean
  showModal: boolean
  setShowModal: (show: boolean) => void
  onSignIn: () => void
}) => {
  return (
    <Modal show={showModal} size="md" popup={true} onClose={() => setShowModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {isReg ? 'Sign up to our platform' : 'Sign in to our platform'}
          </h3>
          <div className="w-full flex flex-row justify-center">
            <Button color="dark" onClick={onSignIn}>
              {isReg ? 'Sign up with Google' : 'Sign in with Google'}
            </Button>
          </div>
          <hr />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput id="email" placeholder="name@company.com" required={true} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" placeholder="************" required={true} />
          </div>
          {isReg && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeatpassword" value="Repeat password" />
              </div>
              <TextInput id="repeatpassword" type="password" placeholder="************" required={true} />
            </div>
          )}
          <div className="w-full">
            <Button>{isReg ? 'Sign up' : 'Sign in'}</Button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {isReg ? 'Already Registered? ' : 'Not Registered? '}
            <Link href="/Register">
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
                onClick={() => {
                  isReg ? isRegistration(false) : isRegistration(true)
                }}
              >
                {isReg ? 'Sign in here.' : 'Sign up here.'}
              </a>
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AuthModalView
