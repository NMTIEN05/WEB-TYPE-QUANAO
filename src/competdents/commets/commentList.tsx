import React, { useEffect, useState } from "react";
import axios from "axios";
import { IComment } from "../interface/commet";
import { Iproduct } from "../interface/product";

const AdminComments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [products, setProducts] = useState<Iproduct[]>([]);

  useEffect(() => {
    fetchComments();
    fetchProducts();
  }, []);

  // 🔹 Lấy danh sách bình luận
  const fetchComments = async () => {
    try {
      const res = await axios.get<IComment[]>("http://localhost:3000/comments");
      console.log("Bình luận từ API:", res.data); // Debug danh sách bình luận
      setComments(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
    }
  };

  // 🔹 Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const res = await axios.get<Iproduct[]>("http://localhost:3000/products");
      console.log("Danh sách sản phẩm từ API:", res.data); // Debug danh sách sản phẩm
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  // 🔹 Lấy tên bài viết theo productId
  const getProductName = (productId: number) => {
    console.log("Tìm sản phẩm với ID:", productId); // Debug ID sản phẩm cần tìm
    if (products.length === 0) return "Đang tải...";
    const product = products.find((p) => p.id === productId);
    console.log("Sản phẩm tìm thấy:", product); // Kiểm tra sản phẩm tìm thấy
    return product ? product.name : "Bài viết không xác định";
  };

  // 🔹 Xóa bình luận
  const deleteComment = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
      try {
        await axios.delete(`http://localhost:3000/comments/${id}`);
        setComments(comments.filter(comment => comment.id !== id));
        alert("Đã xóa bình luận!");
      } catch (error) {
        console.error("Lỗi khi xóa bình luận:", error);
      }
    }
  };

  return (
    <div> 
      <br />
      <h3>Quản Lý Bình Luận</h3>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Bài Viết</th>
              <th>Email Khách Hàng</th>
              <th>Nội Dung</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.id}</td>
                  <td>{getProductName(comment.productId)}</td>
                  <td>{localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).email : "Ẩn danh"}</td>
                  <td>{comment.comment}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteComment(comment.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  Không có bình luận nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComments;
