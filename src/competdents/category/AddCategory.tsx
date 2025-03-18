
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { IFormCategory } from '../interface/category';
// import { IFormCategory } from '../interface/category';


const AddCategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormCategory>();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormCategory) => {
    try {
       await axios.post(`http://localhost:3000/categorys`, data);
      alert('Bạn Đã Danh Mục Phim Thành Công');
      navigate('/dashboard/category/list');
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error('Error posting category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-6 mt-8 w-full h-screen max-w-none mx-auto p-10 bg-gradient-to-r from-teal-600 to-teal-500 rounded-none shadow-xl">
      <h3 className='mt-5' >Thêm Danh Muc</h3>
      <br />

      {/* Các trường nhập liệu */}
      <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Tên Danh Mục
          </label>
          <input
            {...register("namecategory", { required: "Vui lòng nhập tên sản phẩm" })}
            type="text"
            className="form-control"
            id="name"
          />
          {errors.namecategory && <p className="text-danger">{errors.namecategory.message}</p>}
        </div>
        <div className="col-md-6 mt-2">
          <label htmlFor="price" className="form-label">
            Image
          </label>
          <input
            {...register("image", {
              required: "Vui lòng nhập image ",
            })}
            type="text"
            className="form-control"
            id="image"
          />
          {errors.image && <p className="text-danger">{errors.image.message}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Mô Tả
          </label>
          <input
            {...register("describe", { required: "Vui lòng nhập tên sản phẩm" })}
            type="text"
            className="form-control"
            id="describe"
          />
          {errors.describe && <p className="text-danger">{errors.describe.message}</p>}
        </div>
        

     

      {/* Nút thêm sản phẩm */}
      <div className="col-12 mt-3">
          <button className="btn btn-primary" type="submit">
            Thêm Sản Phẩm
          </button>
        </div>
    </form>
  );
};

export default AddCategory;