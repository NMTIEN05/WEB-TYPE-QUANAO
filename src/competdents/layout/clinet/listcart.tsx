import React, { useState, useEffect } from "react";
import "./listcart.css";
import { Link } from "react-router-dom";
import { OrderStatuses } from "../../interface/status";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  categorys: string;
  describe: string;
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
  totalAmount: number;
  grandTotal: number;
  status: string; // Now status is just a code (string)
}

export interface OrderStatus {
  code: string;
  label: string;
}

const Listcart = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editInfo, setEditInfo] = useState<{ paymentMethod: string }>({
    paymentMethod: "",
  });

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/orders");
        const data = await response.json();
        if (Array.isArray(data)) setOrders(data);
        else setError("Dữ liệu đơn hàng không hợp lệ.");
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu.");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = user
    ? orders.filter((order) => order.user.email === user.email)
    : [];

  const getStatusLabel = (statusCode: string): string => {
    const status = OrderStatuses.find((status) => status.code === statusCode);
    return status ? status.label : "Chưa xác định";
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    if (newStatus === "Đã hủy") {
      await handleCancelOrder(orderId);
    } else {
      try {
        const updatedOrder = {
          ...orders.find((order) => order.id === orderId),
          status: newStatus,
        };
        await fetch(`http://localhost:3000/orders/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedOrder),
        });
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert("Cập nhật trạng thái thành công.");
      } catch (err) {
        setError("Lỗi khi cập nhật trạng thái.");
      }
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      await fetch(`http://localhost:3000/orders/${orderId}`, { method: "DELETE" });
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Đơn hàng đã được hủy.");
    } catch (err) {
      setError("Lỗi khi hủy đơn hàng.");
    }
  };

  const handleEditClick = (order: IOrder) => {
    setEditingOrderId(order.id);
    setEditInfo({ paymentMethod: order.paymentMethod });
  };

  const handleEditSave = async (orderId: number) => {
    try {
      const orderToUpdate = orders.find((order) => order.id === orderId);
      if (!orderToUpdate) return;

      const updatedOrder: IOrder = {
        ...orderToUpdate,
        paymentMethod: editInfo.paymentMethod,
      };

      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      setEditingOrderId(null);
      alert("Cập nhật phương thức thanh toán thành công.");
    } catch (err) {
      setError("Lỗi khi chỉnh sửa đơn hàng.");
    }
  };

  if (loading) return <div>Đang tải danh sách đơn hàng...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container5 mt-4 mb-10">
      <h2 className="mb-4">Danh sách đơn hàng</h2>
      {filteredOrders.length === 0 ? (
        <div>Không có đơn hàng nào với email: {user?.email}</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Phương thức thanh toán</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>
                  {order.cartItems.map((item) => (
                    <div key={item.id}>• {item.name} (x{item.sl})</div>
                  ))}
                </td>
                <td className="text-danger">
                  {order.grandTotal.toLocaleString()}đ
                </td>
                <td>
                  {editingOrderId === order.id ? (
                    <select
                      className="form-select"
                      value={editInfo.paymentMethod}
                      onChange={(e) =>
                        setEditInfo({ ...editInfo, paymentMethod: e.target.value })
                      }
                    >
                      <option value="Tiền mặt">Tiền mặt</option>
                      <option value="VNPay">VNPay</option>
                      <option value="Stripe">Stripe</option>
                    </select>
                  ) : (
                    <span>
                      <em>{order.paymentMethod}</em>
                    </span>
                  )}
                </td>
                <td>
                  <span>
                    {getStatusLabel(order.status)} {/* Display the label here */}
                  </span>
                </td>
                <td>
                  {editingOrderId === order.id ? (
                    <button
                      className="btn btn-success btn-sm mb-2"
                      onClick={() => handleEditSave(order.id)}
                    >
                      Lưu
                    </button>
                  ) : (
                    <>
                      <Link
                        to={`/order/${order.id}`}
                        className="btn btn-info btn-sm me-2"
                      >
                        Chi tiết
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-3 text-center">
        <a href="/" className="btn btn-secondary ms-2">
          Quay lại
        </a>
      </div>
    </div>
  );
};

export default Listcart;
