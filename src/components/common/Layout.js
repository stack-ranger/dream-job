import React from 'react';
import Topbar from './Header.js'

const Layout = ({ children }) => {
    return(
        <>
        <Topbar />
        <main>{children}</main>
        </>
    )
}

export default Layout