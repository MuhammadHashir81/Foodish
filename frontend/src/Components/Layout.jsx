import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import AllFood from './AllFood'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Layout = () => {
  return (
    <div>
        
      <Navbar/>
      <Outlet/>
      <Footer/>      
    </div>
  )
}

export default Layout