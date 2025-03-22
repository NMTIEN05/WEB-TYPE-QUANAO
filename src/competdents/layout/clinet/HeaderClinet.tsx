import React, { useEffect, useState } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import logo2 from "./images/logo2.png"
import { Icategory } from '../../interface/category';
import axios from 'axios';

const HeaderClient = () => {
  const [category, setCategory] = useState<Icategory[]>([])

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categorys`)
        setCategory(data)
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu:', error)
      }
    }

    fetchCategories()
  }, [])
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // Refresh để cập nhật giao diện
  };

  return (
    <div className="contrainer">
      <header>
        <div className="header-top">
          <div className="top-top">Sản Phẩm Được Bảo hành 7 ngày</div>
          <div className="top-button">
            <div className="top-buton-left">
            <img src={logo2} width="90px" height="50" alt="Logo" />
            </div>
            <div className="top-buton-right">
              <div className="account-container">
                <div className="account">
                  <i className="fas fa-user"></i> 
                  <div className="account-dropdown">
                    {!user ? (
                      <>
                        <Link to="/login">Đăng Nhập</Link>
                        <Link to="/register">Đăng Ký</Link>
                      </>
                    ) : (
                      <>
                        <button>ACCOUNT</button>
                        <br />
                        <button onClick={handleLogout}>Đăng xuất</button>
                      </>
                    )}
                  </div>
                </div>
                <div className="cart">
                  <a href="/cart" className="cart">
                    <i className="fa-solid fa-shopping-cart"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-button">
          <ul>
            {category.map((item,index)=>(
              <li>
                <Link to={`/category/${item.id}`}><a href="index.html">{item.namecategory}</a></Link>
                
                </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default HeaderClient;
