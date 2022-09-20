import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import homeIcon from "../../../public/Home_Icon.svg";
import userIcon from "../../../public/User_Icon.svg";
import signOutIcon from "../../../public/Sign_InOut_Icon.svg";
import signUpIcon from "../../../public/Sign_Up_Icon.svg";


// TODO: make collapse
const Topbar = (props) => {
  // Dummy auth token for now, chane later
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [href, setHref] = useState('../../presenters/ProfilePresenter')
  const routeBool = isSignedIn ? '../../presenters/ProfilePresenter' : '../../presenters/RegistrationPresenter'

  return (
    <nav
      className="
        relative
        flex flex-wrap
        items-center
        justify-between
        bg-transparent
        text-white
        navbar navbar-expand-lg navbar-light
        "
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div
          className="collapse navbar-collapse flex-grow items-center"
          id="navbarSupportedContent"
        >
          <div className="flex">
            <h1 className="text-2xl pt-3 pb-3 pl-6">DREAM JOB</h1>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex">
            <div className="text-center cursor-pointer  pr-5">
              <Link>
              
              <Image
                src={homeIcon}
                className=""
                alt="Log in Icon"
                width={25}
                height={25}
              />
              <p className="text-xs  mt-1">HOME</p>
              </Link>
            </div>
            <div className="text-center cursor-pointer pr-5">
            <Link href='../../presenters/ProfilePresenter'>
              <Image
                src={isSignedIn ? userIcon : signUpIcon}
                className=""
                alt="Mode action"
                width={25}
                height={25}
              />
              <p className="text-xs  mt-1">
                {isSignedIn ? "PROFILE" : "SIGN UP"}
              </p>
            </Link>
            </div>
            <div className="text-center cursor-pointer ">
              <Link href='../../presenters/LoginPresenter'>
              <Image
                src={signOutIcon}
                className=""
                alt="Mode action"
                width={25}
                height={25}
              />
              <p className="text-xs  mt-1">
                {isSignedIn ? "SIGN OUT" : "SIGN IN"}
              </p>
              </Link>
            </div>
            <button
              className="ml-2 text-xs px-5 py-2 bg-white border border-rounded text-black"
              onClick={() => {
                setIsSignedIn((prevCheck) => !prevCheck)
                prevCheck ? setHref('../../presenters/ProfilePresenter')
                : setHref('../../presenters/RegistrationPresenter')}}
            >
              change dummy state
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
