import React, { useEffect, useState } from 'react';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import logo2 from "./images/logo2.png";
import { Icategory } from '../../interface/category';
import axios from 'axios';

const HeaderClient = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Icategory[]>([]);
  const [user, setUser] = useState(null);

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categorys`);
        setCategory(data);
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchCategories();
  }, []);

  // Kiểm tra xem user đã đăng nhập chưa
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // Refresh để cập nhật giao diện
  };

  // Xử lý khi bấm vào giỏ hàng
  const handleCartClick = () => {
    if (user) {
      navigate("/cart"); // Nếu đã đăng nhập thì vào giỏ hàng
    } else {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      navigate("/login"); // Chưa đăng nhập thì chuyển hướng đến trang login
    }
  };

  return (
    <div className="contrainer">
      <header>
        <div className="header-top">
          <div className="top-top">Sản Phẩm Được Bảo hành 7 ngày</div>
          <div className="top-button">
            <div className="top-buton-left">
              <a href="/"><img src={logo2} width="90px" height="50" alt="Logo" /></a>
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
                      <Link to={"/accout"}>Account</Link>
                      <Link to={"/accout"}>Đơn Hàng</Link>
                      <Link onClick={handleLogout} to={''}>Đăng Xuất</Link> 


                      </>
                    )}
                  </div>
                </div>
                {/* Nút giỏ hàng - bắt buộc đăng nhập */}
                <div className="carts">
                  <button className="cart-btn" onClick={handleCartClick}>
                    <i className="fa-solid fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-button">
          <ul>
            {category.map((item, index) => (
              <li key={index}>
                <Link to={`/category/${item.id}`}>
                  {item.namecategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default HeaderClient;
