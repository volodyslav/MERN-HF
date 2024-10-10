import React from 'react'
import Navbar from './Navbar'
const Layout = ({children}) => {
  return (
    <div className=' min-h-screen bg-base-100'>
        <Navbar/>
        <main>{children}</main>
    </div>
  )
}

export default Layout