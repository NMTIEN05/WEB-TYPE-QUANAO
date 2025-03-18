import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Ifrom } from "../interface/product";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icategory } from "../interface/category";
const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ifrom>();
  const [categories, setCategories] = useState<Icategory[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/categorys');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const onSubmit = async (product: Ifrom) => {
    try {
      await axios.post(`http://localhost:3000/products`, product);
      alert("Bạn Đã Thêm Sản Phẩm Thành Công!");
      navigate(`/dashboard/list`);
    } catch (error) {
      alert("Có lỗi khi thêm sản phẩm");
      console.error(error);
    }
  };

  return (
    
    <div className="container mt-1">
     
     
      <form
        className="row g-3 needs-validation mt-0"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
         <h3 > Them Sản Phẩm</h3>
        {/* Tên Sản Phẩm */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Tên Sản Phẩm
          </label>
          <input
            {...register("name", { required: "Vui lòng nhập tên sản phẩm" })}
            type="text"
            className="form-control"
            id="name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* Giá Thành */}
        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Giá Thành
          </label>
          <input
            {...register("price", {
              required: "Vui lòng nhập giá sản phẩm",
              pattern: {
                value: /^[0-9]+$/,
                message: "Giá phải là số",
              },
            })}
            type="text"
            className="form-control"
            id="price"
          />
          {errors.price && <p className="text-danger">{errors.price.message}</p>}
        </div>

        {/* Image */}
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Ảnh Sản Phẩm (URL)
          </label>
          <input
            {...register("image", { required: "Vui lòng nhập URL ảnh" })}
            type="text"
            className="form-control"
            id="image"
          />
          {errors.image && <p className="text-danger">{errors.image.message}</p>}
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">Danh Mục</label>
          <select
            {...register("categorys", { required: 'Vui lòng chọn danh mục' })}
            className="form-select"
            id="category"
          >
            <option value="">Chọn danh mục...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.namecategory}>{cat.namecategory}</option>
            ))}
          </select>
          {errors.categorys && <p className="text-danger">{errors.categorys.message}</p>}
        </div>

        {/* Mô Tả */}
        <div className="col-md-12">
          <label htmlFor="describe" className="form-label">
            Mô Tả
          </label>
          <textarea
            {...register("describe", { required: "Vui lòng nhập mô tả" })}
            className="form-control"
            id="describe"
            rows={3}
          ></textarea>
          {errors.describe && (
            <p className="text-danger">{errors.describe.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Thêm Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
