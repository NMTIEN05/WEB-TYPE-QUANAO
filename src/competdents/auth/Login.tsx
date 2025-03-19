import React, { useState } from 'react';
import "./auth.css";
import { useForm } from 'react-hook-form';
import { ILogin, IRegister } from '../interface/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const navigate = useNavigate();

  const onSubmit = async (data: ILogin) => {
    try {
      if (data.email.toLowerCase() === "admin@gmail.com" && data.password === "123456") {
         alert("Đăng nhập thành công với tài khoản admin!");
          navigate("/dashboard/list");
           return; }

      await axios.post(`http://localhost:3000/login`, data);
      alert("Đăng Nhập thành công!");
      localStorage.setItem("user", JSON.stringify({ email: data.email }));
      navigate("/");
    } catch (error) {
      alert("sai pass or email");
    }
  };

  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="form p-1">
        <h3 className="title mb-0">Đăng Nhâp</h3>
        
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

        <button type="submit" className="submit">Đăng Nhập</button>
        <p className="footer mt-0">
          Bạn Chưa có Tài Khoản <a href="/register" className="link">Đăng Ký</a>
        </p>
      </form>

      <div className="banner-auth-wrapper">
    <div className="banner-auth">
        <div className="wel_text">Welcome To <br />  WebSite </div>
        {/* <div className="para">This is your auth page</div> */}
    </div>
</div>
    </div>
  );
};

export default Login;