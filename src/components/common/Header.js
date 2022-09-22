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

  return (
    <>    
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" class="flex items-center">
            <span class="ml-6 self-center text-xl font-semibold whitespace-nowrap dark:text-white">DreamJob</span>
        </a>
        <div class="flex md:order-2">
          <Link href="/history">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">History</button>
          </Link>
        </div>
        </div>
      </nav>
    </>
  );
};
export default Topbar;
