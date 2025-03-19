import React, { useState } from 'react';
import "./auth.css";
import { useForm } from 'react-hook-form';
import { IRegister } from '../interface/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IRegister>();
  const navigate = useNavigate();

  const onSubmit = async (data: IRegister) => {
    try {
      await axios.post(`http://localhost:3000/users`, data);
      alert("Tạo tài khoản thành công!");
      navigate("/login");
    } catch (error) {
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
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
            placeholder="SDT"
          />
          <i className="fa fa-phone"></i>
        </div>
        {errors.sdt && <p className="error-message">{errors.sdt.message}</p>}
        
        {/* Email */}
        <div className="inp">
          <input
            type="text"
            {...register("email", { required: "Email không được để trống", pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" } })}
            className="input"
            placeholder="Email"
          />
          <i className="fa-solid fa-user"></i>
        </div>
        {errors.email && <p className="error-message">{errors.email.message}</p>}
        
        {/* Password */}
        <div className="inp">
          <input
            type={passwordType}
            id="password"
            className="input"
            {...register("password", { required: "Mật khẩu không được để trống" })}
            placeholder="Password"
          />
          <i
            id="togglePassword"
            className={`fas ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}
            style={{ cursor: 'pointer' }}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        
        <div className="form-group mt-2">
          <br />
          <div className="mxh">
            <div className="icon">
              <a href="https://www.web-leb.com/code" className="btn">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <div className="icon">
              <a href="https://www.web-leb.com/code" className="btn">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
            <div className="icon">
              <a href="https://www.web-leb.com/code" className="btn">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <button type="submit" className="submit">Đăng Ký</button>
        <p className="footer mt-0">
          Bạn Đã có Tài Khoản <a href="/login" className="link">Đăng Nhập</a>
        </p>
      </form>
      <div className="banner-auth-wrapper">
    <div className="banner-auth">
        <div className="wel_text">Welcome To <br /> WebSite </div>
        {/* <div className="para">This is your auth page</div> */}
    </div>
</div>
    </div>
  );
};

export default Register;