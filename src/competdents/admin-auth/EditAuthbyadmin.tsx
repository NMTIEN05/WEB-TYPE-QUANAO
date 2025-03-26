import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IRegister } from "../interface/user";
import axios from "axios";

const EditAuthbyadmin = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IRegister>();
  const [passwordType, setPasswordType] = useState("password");

  // Lấy thông tin user hiện tại
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        const userData = response.data;
        setValue("name", userData.name);
        setValue("sdt", userData.sdt);
        setValue("email", userData.email);
        setValue("password", userData.password);
        setValue("address", userData.address); // Thêm dòng này
      })
      .catch(() => alert("Lỗi khi tải dữ liệu người dùng!"));
  }, [id, setValue]);

  // Gửi dữ liệu chỉnh sửa lên API
  const onSubmit = (data: IRegister) => {
    axios.put(`http://localhost:3000/users/${id}`, data)
      .then(() => {
        alert("Cập nhật thông tin thành công!");
        navigate("/dashboard/auth");
      })
      .catch(() => alert("Có lỗi xảy ra. Vui lòng thử lại."));
  };

  // Hiển thị/mật khẩu
  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="container mt-3">
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <h3>Chi Tiết Người Dùng</h3>

        {/* Name */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Tên Người Dùng</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            {...register("name", { required: "Tên không được để trống" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* Số điện thoại */}
        <div className="col-md-6">
          <label htmlFor="sdt" className="form-label">Số Điện Thoại</label>
          <input 
            type="text" 
            className="form-control" 
            id="sdt" 
            {...register("sdt", { required: "Số điện thoại không được để trống" })}
          />
          {errors.sdt && <p className="text-danger">{errors.sdt.message}</p>}
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            {...register("email", { required: "Email không được để trống" })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Mật Khẩu</label>
          <div className="input-group">
            <input 
              type={passwordType} 
              className="form-control" 
              id="password" 
              {...register("password", { required: "Mật khẩu không được để trống" })}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
              {passwordType === "password" ? "👁" : "🙈"}
            </button>
          </div>
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        {/* Địa chỉ nhận hàng */}
        <div className="col-md-12">
          <label htmlFor="address" className="form-label">Địa Chỉ Nhận Hàng</label>
          <input 
            type="text" 
            className="form-control" 
            id="address" 
            {...register("address", { required: "Địa chỉ không được để trống" })}
          />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Cập Nhật</button>
        </div>
      </form>
    </div>
  );
};

export default EditAuthbyadmin;
