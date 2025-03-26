import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./cart.css";
import { IRegister } from "../../../interface/user";

const Account: React.FC = () => {
  const [user, setUser] = useState<IRegister | null>(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("User data from localStorage:", parsedUser); // Debug log
        setUser(parsedUser);
      } catch (error) {
        console.error("Lỗi parse dữ liệu từ localStorage:", error);
      }
    }
  }, []);

  if (!user) {
    return <p className="text-center">Vui lòng đăng nhập</p>;
  }

  return (
    <div className="account-containers">
      <div className="account-card">
        {/* Avatar */}
        <img
          src={`https://i.pravatar.cc/100?u=${user.email}`}
          alt="User Avatar"
          className="avatar"
        />

        {/* Thông Tin Người Dùng */}
        <div className="account-info">
          <p><strong>Họ Và Tên:</strong> {user.name || "Chưa có thông tin"}</p>
          <p><strong>Email:</strong> {user.email || "Chưa có thông tin"}</p>
          <p><strong>SĐT:</strong> {user.sdt || "Chưa có thông tin"}</p>
          <p><strong>Địa Chỉ Nhận Hàng:</strong> {user.address || "Chưa có thông tin"}</p> 
        </div>

        {/* Nút Chỉnh Sửa */}
        <Link to="/edit-account" className="account-edit">
          <i className="fas fa-edit"></i> Chỉnh Sửa Thông Tin
        </Link>
      </div>
    </div>
  );
};

export default Account;
