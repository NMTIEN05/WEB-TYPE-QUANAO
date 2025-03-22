import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Iproduct } from "../../interface/product";
import { Icategory } from "../../interface/category";

const ProductByCategory = () => {
    const { category } = useParams<{ category: string }>(); // Lấy category từ URL
    const [products, setProducts] = useState<Iproduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [categorys, setCategory] = useState<Icategory[]>([])


    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const res = await axios.get<Iproduct[]>(`http://localhost:3000/products?category=${category}`);
                setProducts(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [category]);

    // Lấy danh sách danh mục từ API
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3000/categorys`)
          setCategory(data)
        //   console.log(data);
          
        } catch (error) {
          console.error('Có lỗi khi lấy dữ liệu:', error)
        }
      }
  
      fetchCategories()
    }, [])
  

    if (loading) return <p>Đang tải...</p>;
    if (products.length === 0) return <p>Không có sản phẩm nào trong danh mục này</p>;

    return (
        <div className="product-list">
            <br />
            <h3>Danh sách sản phẩm thuộc danh mục:</h3>
            <div className="container">
             <div className="product-full">
                {products.map((item)=>(
             <div className="product">
             <Link to={`/category/product/${item.id}`} ><img
               src={item.image}
               alt="Sản phẩm 1"
               className="product-image"
             /></Link>
             <div className="product-info">
               <h5 className="product-name">{item.name}</h5>
               <p className="product-price">{item.price} VND</p>
             </div>
             
            </div>
            
                ))}
               
               </div>
              </div>
        </div>
    );
};

export default ProductByCategory;
