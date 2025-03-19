import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { IRegister, Iuser } from '../interface/user';
import axios from 'axios';


const ListAuthbyadmin = () => {
    const [auth, setAuth] = useState<Iuser[]>([]);

    // Fetch dữ liệu sản phẩm từ API
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/users');
          setAuth(data);
        } catch (error) {
          console.error('Lỗi khi tải danh sách sản phẩm:', error);
        }
      };
      fetchProducts();
    }, []);
    //xoa sp 
    const handleDelete = async (id: string|number) => {
        if (window.confirm('Bạn có chắc muốn user này?')) {
          try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            setAuth(auth.filter(auth => auth.id !== id));
            alert('user đã được xóa');
          } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
          }
        }
      };
  return (
    <div>
      <br />
          <h3>Danh Sách Tài Khoản</h3>
          <br />
      
        <table className="table caption-top">
        <thead>
      
        <tr>
            <th scope="col">ID</th>
           
            <th scope="col">email</th>
           
            <th scope="col">Chức Năng</th>

          </tr>
        </thead>
        <tbody>
        {auth.map((auth, index) => (
                  <tr key={auth.id}>
                    <td>{index + 1}</td>
                   
                    <td>{auth.email}</td>
                   
                    <td>
                      <button className="btn btn-delete" onClick={() => handleDelete(auth.id)}>🗑</button>
                      <Link to={`/dashboard/auth/edit/${auth.id}`} className="btn btn-edit">👀</Link>
                    </td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListAuthbyadmin
