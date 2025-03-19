import React from 'react'
import HeaderClinet from './clinet/HeaderClinet'
import FooterClinet from './clinet/FooterClinet'
import "../layout/Cline.css"
import MainTop from './clinet/MainTop'
import MainButton from './clinet/MainButton'
import { Outlet } from 'react-router-dom'

const Clinet = () => {
  return (
    <div className="body"> 
    <HeaderClinet />
    <Outlet />
    <FooterClinet />
  </div> 
  )
}

export default Clinet
