import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Iproduct } from "../../interface/product";
import axios from "axios";
import { useShoppingContext } from "../contexts.tsx/ShoppingContext";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>(); // Lấy id từ URL
    const [product, setProduct] = useState<Iproduct | null>(null);
    const [loading, setLoading] = useState(true);

    const { addCartItem } = useShoppingContext();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get<Iproduct>(`http://localhost:3000/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Đang tải...</p>;
    if (!product) return <p>Sản phẩm không tồn tại</p>;

    return (
        <div className="product-detail">
            <img
                src={product.image || "https://bedental.vn/wp-content/uploads/2022/11/ho-1024x1024.jpg"}
                alt={product.name}
                width={300}
            />
            <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.describe || "Mô tả sản phẩm chưa cập nhật."}</p>
                <p className="price">Giá: {product.price} VNĐ</p>
                <div className="buttons">
                <button 
    className="add-to-cart" 
    onClick={() => {
        if (product) {
            addCartItem(product);
            alert("🎉 Sản phẩm đã được thêm vào giỏ hàng!");
        }
    }}
>
    Thêm vào giỏ hàng
</button>
                    <button className="buy-now">Mua ngay</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
