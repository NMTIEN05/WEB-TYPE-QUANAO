import React from 'react'
import HeaderClinet from './clinet/HeaderClinet'
import FooterClinet from './clinet/FooterClinet'
import "../layout/Cline.css"
import MainTop from './clinet/MainTop'
import MainButton from './clinet/MainButton'

const Clinet = () => {
  return (
    <div className="body"> 
    <HeaderClinet />
    <MainTop />
    <MainButton />
    <FooterClinet />
  </div> 
  )
}

export default Clinet
