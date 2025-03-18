import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Iproduct } from '../interface/product';
import { Link } from 'react-router-dom';
import "./style.css"


const ListProduct = () => {
    const [products, setProducts] = useState<Iproduct[]>([]);

  // Fetch dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products');
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
      }
    };
    fetchProducts();
  }, []);

  // Xóa sản phẩm
  const handleDelete = async (id: string|number) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
        alert('Sản phẩm đã được xóa');
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    }
  };
  return (
    <div>

  <h3>Danh Sách Sản Phẩm</h3>
  <button type="button" className="btn btn-outline-primary mb-3"><Link to="/dashboard/add" className="custom-link">Thêm Sản Phẩm</Link></button>
  

  <br />

    <table className="table caption-top">
  <thead>

  <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">IMAGE</th>
      <th scope="col">GÍA</th>
      <th scope="col">MÔ TẢ</th>
      <th scope="col">Danh Mục</th>
      <th scope="col">Hành Động</th>
    </tr>
  </thead>
  <tbody>
  {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td className='image-list'>
            <img src={product.image} className='image-list' />
               </td>

              <td>{product.price}</td>
              <td>{product.describe}</td>
              <td>{product.categorys}</td>
              <td>
                <button className="btn btn-delete" onClick={() => handleDelete(product.id)}>🗑 Xóa</button>
                <Link to={`/dashboard/edit/${product.id}`} className="btn btn-edit">✏ Sửa</Link>
              </td>
            </tr>
          ))}
  
   
  </tbody>
</table>


    </div>
  )
}

export default ListProduct
