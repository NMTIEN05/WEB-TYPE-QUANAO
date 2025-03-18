import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'


const HeaderClinet = () => {
  return (
   <div className="contrainer">
      <header>
      <div className="header-top">
        <div className="top-top">Sản Phẩm Được Bảo hành 7 ngày</div>
        <div className="top-button">
          <div className="top-buton-left">
            <img
              src=""
              width="100px"
              height="50"
              alt="Logo"
            />
          </div>
          <div className="top-buton-right">
            <div className="account-container">
              <div className="account">
                <i className="fas fa-user"></i> Tài khoản
                <div className="account-dropdown">
                  <Link to={`login`}>Đăng Nhập</Link>
                  <Link to={`register`}>Đăng Ký</Link>
                </div>
              </div>
              <div className="cart">
                <a href="cart.html" className="cart">
                  <i className="fa-solid fa-shopping-cart"></i> Giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-button">
        <ul>
          <li>
            <a href="index.html">Trang Chủ</a>
          </li>
          <li>
            <a href="category.html">Sản Phẩm 1</a>
          </li>
          <li>
            <a href="category.html">Sản Phẩm 1</a>
          </li>
          <li>
            <a href="category.html">Sản Phẩm 1</a>
          </li>
        </ul>
      </div>
    </header>
    </div>
  )
}

export default HeaderClinet
