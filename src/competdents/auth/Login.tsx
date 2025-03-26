import React, { useState } from "react";
import "./auth.css";
import { useForm } from "react-hook-form";
import { ILogin } from "../interface/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const onSubmit = async (data: ILogin) => {
    try {
      const emailTrimmed = data.email.trim().toLowerCase();
      const passwordTrimmed = data.password.trim();

      // 🛑 Tìm user theo email
      const response = await axios.get(`http://localhost:3000/users?email=${emailTrimmed}`);

      if (response.data.length > 0) {
        const user = response.data[0];

        // 🔴 So sánh trực tiếp mật khẩu nhập vào với mật khẩu đã lưu (không dùng mã hóa)
        if (user.password === passwordTrimmed) {
          localStorage.setItem("user", JSON.stringify(user));

          // 🛑 Nếu là admin, chuyển hướng tới dashboard
          if (user.role === "admin") {
            alert("Đăng nhập admin thành công!");
            navigate("/dashboard");
          } else {
            alert("Đăng nhập thành công!");
            navigate("/");
          }
        } else {
          alert("Sai mật khẩu!");
        }
      } else {
        alert("Email không tồn tại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form p-1">
        <h3 className="title mb-0">Đăng Nhập</h3>

        {/* Email */}
        <div className="inp">
          <input
            type="text"
            {...register("email", {
              required: "Email không được để trống",
              pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
            })}
            className="input"
            placeholder="Email"
          />
          <i className="fa-solid fa-envelope"></i>
        </div>
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        {/* Password */}
        <div className="inp">
          <input
            type={passwordType}
            {...register("password", { required: "Mật khẩu không được để trống" })}
            className="input"
            placeholder="Mật khẩu"
          />
          <i className={`fas ${passwordType === "password" ? "fa-eye" : "fa-eye-slash"}`} onClick={togglePasswordVisibility}></i>
        </div>
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <button type="submit" className="submit">Đăng Nhập</button>
        <p className="footer mt-0">
          Bạn chưa có tài khoản? <a href="/register" className="link">Đăng Ký</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
