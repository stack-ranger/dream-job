import React from 'react';
import Topbar from './Header.js'
import Head from 'next/head'
import Script from 'next/script.js';

const Layout = ({ children }) => {
    return(
        <>
          <Topbar />
          <main>{children}</main>
        </>
    )
}

export default Layout