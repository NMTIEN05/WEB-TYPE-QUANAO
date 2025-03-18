
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Icategory } from '../interface/category'
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';



const ListCategory = () => {
  const [category, setCategory] = useState<Icategory[]>([])

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categorys`)
        setCategory(data)
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu:', error)
      }
    }

    fetchCategories()
  }, [])

  // Xóa danh mục
  const handleDelete = async (id: string | number) => {
    try {
      if (confirm('Bạn có chắc chắn muốn xóa không?')) {
        await axios.delete(`http://localhost:3000/categorys/${id}`)
        setCategory(category.filter(item => item.id !== id)) // Cập nhật lại danh sách
        alert('Danh mục đã được xóa thành công!')
      }
    } catch (error) {
      console.error('Có lỗi khi xóa danh mục:', error)
    }
  }

  return (
  <div>

    <h3 className='mt-5'>Danh Sách Danh Mục</h3>
    <button type="button" className="btn btn-outline-primary mb-3"><Link to="/dashboard/category/add" className="custom-link">Thêm Danh Mục</Link></button>
      <table className="table caption-top">
      <thead>
    
      <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">IMAGE</th>
          <th scope="col">Ghi Chú</th>

          <th scope="col">Chức Năng</th>

        </tr>
      </thead>
      <tbody>
      {category.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.namecategory}</td>
                  <td className='image-list'>
                <img src={category.image} className='image-list' />
                   </td>
                  <td>{category.describe}</td>

                  <td>
                    <button className="btn btn-delete" onClick={() => handleDelete(category.id)}>🗑 </button>
                    <Link to={`/dashboard/edit/category/${category.id}`} className="btn btn-edit">✏ </Link>
                  </td>
                </tr>
              ))}
      
       
      </tbody>
    </table>
  </div>
  )
}

export default ListCategory
