import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./editAccount.css";
import { Iuser } from "../../../interface/user";

const EditAccount: React.FC = () => {
  const [user, setUser] = useState<Iuser | null>(null);
  const [formData, setFormData] = useState<Iuser>({
    id: 0,
    name: "",
    email: "",
    sdt: "",
    address: "",
    password: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: Iuser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(parsedUser);
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu từ localStorage:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (oldPassword && newPassword) {
        if (oldPassword !== user?.password) {
          alert("Mật khẩu cũ không đúng!");
          return;
        }
        formData.password = newPassword;
      }

      await axios.put(`http://localhost:3000/users/${formData.id}`, formData);
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Cập nhật thành công!");
      navigate("/accout");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      alert("Cập nhật thất bại!");
    }
  };

  if (!user) {
    return <p className="text-center">Vui lòng đăng nhập</p>;
  }

  return (
   
    <div className="edit-account-container">
        
      <h2>Edit Thông Tin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Họ Và Tên:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Số Điện Thoại:
          <input type="text" name="sdt" value={formData.sdt} onChange={handleChange} required />
        </label>

        <label>
          Địa Chỉ:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
<br />
        <h4>Đổi Mật Khẩu</h4>
        <label>
          Mật khẩu cũ:
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </label>

        <label>
          Mật khẩu mới:
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>

        <button type="submit" className="save-btn">Lưu Thay Đổi</button>
      </form>
    </div>
  );
};

export default EditAccount;