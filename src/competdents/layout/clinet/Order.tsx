import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios
import "./pay.css";

interface CartItem {
  id: number;
  name: string;
  price: string;
  sl: number;
}

interface IUser {
  name: string;
  email: string;
  sdt: string;
  id: number;
}

interface IOrder {
  id: number;
  orderCode: string;
  orderDate: string;
  user: IUser;
  cartItems: CartItem[];
  paymentMethod: string;
  shippingFee: number;
  grandTotal: number;
  status: string;
}

const OrdersList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/orders/${id}`);
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu đơn hàng.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order || order.status === "Đã hủy" || order.status === "Đã giao") {
      alert("Không thể huỷ đơn hàng này.");
      return;
    }

    try {
      // Cập nhật trạng thái đơn hàng thành "Đã hủy"
      const updatedOrder = { ...order, status: "Đã hủy" };
      console.log("Updated Order:", updatedOrder); // Debugging thông tin đơn hàng

      // Gửi PUT request để cập nhật trạng thái đơn hàng
      const res = await axios.put(`http://localhost:3000/orders/${order.id}`, updatedOrder, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response from API:", res); // Kiểm tra phản hồi từ server

      // Cập nhật lại state của đơn hàng
      setOrder(updatedOrder);
      alert("Đơn hàng đã được hủy.");
      navigate("/");  // Quay lại trang chính hoặc danh sách đơn hàng
    } catch (err) {
      console.error("Error when canceling order:", err); // Debugging lỗi
      setError("Lỗi khi hủy đơn hàng.");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Không tìm thấy đơn hàng.</div>;

  return (
    <div
      className="container5 mt-4 mb-10"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 className="mb-3">Chi Tiết Đơn Hàng</h2>

      <p><strong>Mã Đơn:</strong> {order.orderCode}</p>
      <p><strong>Ngày Đặt:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
      <p><strong>Trạng Thái:</strong> {order.status}</p>
      <p><strong>Phương Thức Thanh Toán:</strong> {order.paymentMethod}</p>
      <p><strong>Khách Hàng:</strong> {order.user.name}</p>
      <p><strong>Email:</strong> {order.user.email}</p>
      <p><strong>Số Điện Thoại:</strong> {order.user.sdt}</p>

      <h5 className="mt-4">Sản phẩm</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          {order.cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.sl}</td>
              <td>{parseInt(item.price).toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="mt-3">Phí Vận Chuyển: <span className="text-danger">{order.shippingFee.toLocaleString()}đ</span></h5>
      <h5 className="mt-3">Tổng Tiền: <span className="text-danger">{order.grandTotal.toLocaleString()}đ</span></h5>

      <div className="mt-4 text-center">
        {/* Hiển thị nút huỷ đơn chỉ khi trạng thái là chưa "Đã hủy" và "Đã giao" */}
        {order.status !== "cancelled" && order.status !== "shipped" && (
          <button className="btn btn-danger" onClick={handleCancelOrder}>
            Huỷ đơn
          </button>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
