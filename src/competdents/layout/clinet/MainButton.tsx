import React, { useEffect, useState } from 'react'
import { Iproduct } from '../../interface/product';
import axios from 'axios';
import "../mainbuuton.css"
import { Link } from 'react-router-dom';

const MainButton = () => {
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
  return (
    <div>
      <h2>
  Sản Phẩm Mới
</h2>
<div className="container">
  <div className="product-full">
    {products.map((item,index)=>(
 <div className="product">
 <Link to={`product/${item.id}`} ><img
   src={item.image}
   alt="Sản phẩm 1"
   className="product-image"
 /></Link>
 <div className="product-info">
   <h5 className="product-name">{item.name}</h5>
   <p className="product-price">Price : {item.price} VND</p>
 </div>
</div>
    ))}
   

  </div>
</div>
<button id="loadMore">Xem Thêm</button>

    </div>
  )
}

export default MainButton
