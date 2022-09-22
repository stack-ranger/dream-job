import React from 'react';
import Topbar from './Header.js'
import Head from 'next/head'

const Layout = ({ children }) => {
    return(
        <>
          <Head>
            <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />
            <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
          </Head>
          <Topbar />
          <main>{children}</main>
        </>
    )
}

export default Layout