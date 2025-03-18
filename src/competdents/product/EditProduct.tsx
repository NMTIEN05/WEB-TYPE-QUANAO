import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Ifrom } from "../interface/product";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icategory } from "../interface/category";
const EditProduct = () => {
    const param = useParams()
    const id = param.id
  const {
    register,
    reset,
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
      await axios.put(`http://localhost:3000/products/${id}`, product);
      alert("Bạn Đã Thêm Sản Phẩm Thành Công!");
      navigate(`/dashboard/list`);
    } catch (error) {
      alert("Có lỗi khi thêm sản phẩm");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        reset(data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
      }
    }
    fetchProduct();
  }, []);


  return (
    <div className="container mt-1">
      <h3>Thêm Sản Phẩm</h3>
      <form
        className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
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
              <option key={cat.namecategory} value={cat.namecategory}>{cat.namecategory}</option>
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

export default EditProduct;
