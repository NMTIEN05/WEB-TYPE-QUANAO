import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Iproduct } from "../../interface/product";
// import { useShoppingContext } from "../contexts/ShoppingContext";
import { IComment, IFormCommet } from "../../interface/commet";
import { useShoppingContext } from "../contexts.tsx/ShoppingContext";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState<Iproduct | null>(null);
    const [loading, setLoading] = useState(true);
    const { addCartItem } = useShoppingContext();

    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    // Lấy email khách hàng từ localStorage
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserEmail(parsedUser.email);
            } catch (error) {
                console.error("Lỗi khi parse dữ liệu từ localStorage:", error);
            }
        }
    }, []);

    // 🔹 Lấy thông tin sản phẩm + bình luận từ API
    useEffect(() => {
        if (!id) return;

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

        const fetchComments = async () => {
            try {
                const res = await axios.get<IComment[]>(`http://localhost:3000/comments?productId=${id}`);
                setComments(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy bình luận:", error);
            }
        };

        fetchProduct();
        fetchComments();
    }, [id]);

    // 🔹 Gửi bình luận lên API
    const AddComment = async () => {
        if (!newComment.trim()) return;

        if (!userEmail) {
            alert("Vui lòng đăng nhập để bình luận!");
            return;
        }

        const newCommentObj: IFormCommet = { 
            comment: `${userEmail}: ${newComment}`,
            productId: Number(id) // 🔥 Chuyển id sang number
        };

        try {
            const res = await axios.post<IComment>("http://localhost:3000/comments", newCommentObj);
            setComments([...comments, res.data]); // Thêm bình luận mới vào danh sách
            setNewComment(""); // Xóa input sau khi gửi thành công
        } catch (error) {
            console.error("Lỗi khi gửi bình luận:", error);
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (!product) return <p>Sản phẩm không tồn tại</p>;

    return (
        <div>
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
                                if (!userEmail) {
                                    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
                                    return;
                                }
                                addCartItem(product);
                                alert("🎉 Sản phẩm đã được thêm vào giỏ hàng!");
                            }}
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button className="buy-now">Mua ngay</button>
                    </div>
                </div>
            </div>

            {/* Phần bình luận */}
            <div className="comment-section">
                <h3>Bình luận</h3>
                <ul className="comment-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <li key={comment.id} className="comment-item">
                                <p className="comment-content">{comment.comment}</p>
                            </li>
                        ))
                    ) : (
                        <p>Chưa có bình luận nào.</p>
                    )}
                </ul>
                <div className="comment-form">
                    <textarea 
                        placeholder="Nhập bình luận của bạn..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={AddComment}>Gửi bình luận</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
