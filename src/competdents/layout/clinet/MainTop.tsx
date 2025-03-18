import React from 'react'
import "./style.css"
import CountdownTimer from './CountdownTimer'

const MainTop = () => {
  return (
    <div>
        <div className="banner">
  <img
    src="https://img.pikbest.com/origin/06/43/50/933pIkbEsT7AG.jpg!w700wp"
    width="100%"
    alt=""
  />
</div>
<h2>
  Sản Phẩm Sale <i className="fas fa-fire"></i>
</h2>

<div className="container-top">
  <div className="countdown-timer">
    Thời Gian Sale <br /> <span id="countdown"> <CountdownTimer /> </span>
  </div>

  <div className="product-full">
    <div className="product">
      <img
        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsuwucp5khw9cd"
        alt="Sản phẩm 1"
        className="product-image"
      />

      <div className="product-info">
        <h2 className="product-name">Sản phẩm 1</h2>
        <p className="product-price-ago">Giá cũ: 500.000 VND</p>
        <p className="product-price">Giá: 500.000 VND</p>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default MainTop
