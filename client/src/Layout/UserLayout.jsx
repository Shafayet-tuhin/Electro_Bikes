import React from 'react'
import Nav from '../Pages/Shared/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Shared/Footer/Footer'
import GoUp from '../Pages/Home/Go up/GoUp'

function Layout() {
  return (
    <div className='max-w-screen-xl mx-auto'>

        <Nav/>
        <GoUp/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout