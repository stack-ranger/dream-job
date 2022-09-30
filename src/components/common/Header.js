import Link from "next/link";
import { useState } from "react";
import { Navbar, Modal, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { signIn, signOut, useSession } from 'next-auth/react'

const Topbar = (props) => {
  const [loginModal, setLoginModal] = useState(false)
  const { data: session, status } = useSession()

  return (
    <>    
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="/">
          <span className="ml-6 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            DreamJob
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/history">
            History
          </Navbar.Link>
          <Navbar.Link
            href="/"
            active={true}
          >
            Home
          </Navbar.Link>
          {session ? 
          <Navbar.Link href="#" onClick={() => signOut()}>
            Logout
          </Navbar.Link>
          :
          <Navbar.Link href="#" onClick={()=>setLoginModal(true)}>
            Login
          </Navbar.Link>}
        </Navbar.Collapse>
      </Navbar>
      <Modal
        show={loginModal}
        size="md"
        popup={true}
        onClose={()=>setLoginModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div className="w-full flex flex-row justify-center">
              <Button color="dark" onClick={() => signIn('google')}>
                Log in with Google 
              </Button>
            </div>
            <hr />
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Your email"
                />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password"
                type="password"
                required={true}
              />
            </div>
            <div className="w-full">
              <Button>
                Log in to your account
              </Button>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{' '}
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Topbar;
