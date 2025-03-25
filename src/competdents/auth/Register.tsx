import React, { useState } from "react";
import "./auth.css";
import { useForm } from "react-hook-form";
import { IRegister } from "../interface/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const onSubmit = async (data: IRegister) => {
    try {
      // Gửi dữ liệu lên backend (API giả lập)
      await axios.post("http://localhost:3000/users", {
        email: data.email,
        password: data.password, // Không mã hóa mật khẩu
        name: data.name,
        sdt: data.sdt
      });
      

      // Lưu thông tin người dùng vào localStorage
      const userData = {
        name: data.name,
        email: data.email,
        sdt: data.sdt,
        // address: data.address, // Địa chỉ
      };
      localStorage.setItem("user", JSON.stringify(userData));

      alert("Tạo tài khoản thành công!");
      navigate("/login");
    } catch (error) {
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form p-1">
        <h3 className="title mb-0">Đăng Ký</h3>

        {/* Họ và Tên */}
        <div className="inp">
          <input
            type="text"
            {...register("name", { required: "Họ và Tên không được để trống" })}
            className="input"
            placeholder="Họ Và Tên"
          />
          <i className="fa-solid fa-user"></i>
        </div>
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        {/* Số điện thoại */}
        <div className="inp">
          <input
            type="text"
            {...register("sdt", { required: "Số điện thoại không được để trống" })}
            className="input"
            placeholder="Số điện thoại"
          />
          <i className="fa fa-phone"></i>
        </div>
        {errors.sdt && <p className="error-message">{errors.sdt.message}</p>}

        {/* Email */}
        <div className="inp">
          <input
            type="text"
            {...register("email", {
              required: "Email không được để trống",
              pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
            })}
            className="input"
            placeholder="Email"
          />
          <i className="fa-solid fa-envelope"></i>
        </div>
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        {/* Địa chỉ
        <div className="inp">
          <input
            type="text"
            {...register("address", { required: "Địa chỉ không được để trống" })}
            className="input"
            placeholder="Địa chỉ"
          />
          <i className="fa-solid fa-location-dot"></i>
        </div>
        {errors.address && <p className="error-message">{errors.address.message}</p>} */}

        {/* Mật khẩu */}
        <div className="inp">
          <input
            type={passwordType}
            className="input"
            {...register("password", { required: "Mật khẩu không được để trống" })}
            placeholder="Mật khẩu"
          />
          <i
            className={`fas ${passwordType === "password" ? "fa-eye" : "fa-eye-slash"}`}
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        {/* Nút Đăng Ký */}
        <button type="submit" className="submit">
          Đăng Ký
        </button>

        <p className="footer mt-0">
          Bạn Đã có Tài Khoản? <a href="/login" className="link">Đăng Nhập</a>
        </p>
      </form>

      {/* Banner bên phải */}
      <div className="banner-auth-wrapper">
        <div className="banner-auth">
          <div className="wel_text">Welcome To <br /> WebSite</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
