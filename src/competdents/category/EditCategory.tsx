import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IFormCategory } from '../interface/category';
import 'bootstrap/dist/css/bootstrap.min.css';


const EditCategory = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormCategory>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categorys/${id}`);
        reset(data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id, reset]);

  const onSubmit = async (data: IFormCategory) => {
    try {
      await axios.put(`http://localhost:3000/categorys/${id}`, data);
      alert('Category updated successfully');
      navigate('/dashboard/category/list');
    } catch (error) {
      alert('An error occurred. Please try again!');
      console.error('Error updating category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h3 className='mt-5' >Edit Category</h3>

      <div className="form-group">
        <label htmlFor="namecategory">Category Name</label>
        <input
          {...register('namecategory', { required: 'Please enter the category name' })}
          type="text"
          className="form-control"
          id="namecategory"
        />
        {errors.namecategory && <p className="error-message">{errors.namecategory.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          {...register('image', { required: 'Please enter the image URL' })}
          type="text"
          className="form-control"
          id="image"
        />
        {errors.image && <p className="error-message">{errors.image.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="describe">Description</label>
        <textarea
          {...register('describe', { required: 'Please enter a description' })}
          className="form-control"
          id="describe"
        ></textarea>
        {errors.describe && <p className="error-message">{errors.describe.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary">Update Category</button>
    </form>
  );
};

export default EditCategory;
