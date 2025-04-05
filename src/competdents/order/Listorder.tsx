import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IOrder {
  id: string;
  orderCode: string;
  orderDate: string;
  user: {
    name: string;
    sdt: string;
    email: string;
    address: string;
    role: string;
  } | null; // Thêm null vào để cho phép user có thể là null
  cartItems: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: string;
  shippingFee: number;
  totalAmount: number;
  grandTotal: number;
  status: string;
}

const ListOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);  // Tạo state để chứa danh sách đơn hàng
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        setOrders(response.data); // Lưu dữ liệu vào state
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Lấy đơn hàng cũ từ state bằng id để giữ nguyên các thông tin khác
      const updatedOrder = orders.find(order => order.id === id);

      if (!updatedOrder) return;

      // Cập nhật chỉ trạng thái
      const orderToUpdate = { ...updatedOrder, status: newStatus };

      // Gửi PUT request đến API để thay đổi trạng thái
      await axios.put(`http://localhost:3000/orders/${id}`, orderToUpdate);
      alert("cập nhật thành công")

      // Cập nhật trạng thái trong local state sau khi cập nhật thành công
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, status: newStatus } // Chỉ thay đổi trạng thái, không thay đổi các thông tin khác
            : order
        )
      );
    } catch (err) {
      setError("Lỗi khi cập nhật trạng thái.");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3 className="text-center mt-10 mb-4">Quản Lý Đơn Hàng</h3>
      <div className="container mt-5">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Mã Đơn</th>
                <th>Ngày Đặt</th>
                <th>Khách Hàng</th>
                <th>Trạng Thái</th>
                <th>Phương Thức Thanh Toán</th>
                <th>Chỉnh Sửa</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.orderCode}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.user ? order.user.name : 'Không có tên'}</td> {/* Kiểm tra xem user có tồn tại không */}
                  <td>
                  <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => {
                        // Không cho phép thay đổi trạng thái nếu là "Đã hủy"
                        if (order.status === 'Đã hủy' && 'Đã giao') {
                          return;
                        }
                        setOrders((prevOrders) =>
                          prevOrders.map((item) =>
                            item.id === order.id
                              ? { ...item, status: e.target.value }
                              : item
                          )
                        );
                      }}
                      disabled={order.status === 'Đã hủy'|| order.status === 'Đã giao'} // Vô hiệu hóa dropdown khi trạng thái là "Đã hủy"
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đang vận chuyển">Đang vận chuyển</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatusChange(order.id, order.status)}
                    >
                      Thay đổi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
