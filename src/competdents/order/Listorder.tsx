import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrderStatuses } from "../interface/status";

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
  } | null;
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
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSelectChange = (id: string, newStatus: string) => {
    setSelectedStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleStatusChange = async (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    const selectedStatus = selectedStatuses[id];
    const currentStatus = order.status;

    if (!selectedStatus || selectedStatus === currentStatus) {
      alert("⚠️ Vui lòng chọn trạng thái khác để thay đổi.");
      return;
    }

    if (selectedStatus === "cancelled" || selectedStatus === "shipped") {
      const confirmChange = window.confirm(
        "⚠️ Bạn có chắc chắn muốn thay đổi trạng thái sang 'Đã hủy' hoặc 'Đã giao hàng'?"
      );
      if (!confirmChange) return;
    }

    try {
      const updatedOrder = { ...order, status: selectedStatus };
      await axios.put(`http://localhost:3000/orders/${id}`, updatedOrder);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: selectedStatus } : o))
      );
      alert("✅ Cập nhật trạng thái thành công!");
    } catch {
      alert("❌ Lỗi khi cập nhật trạng thái.");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3 className="text-center mt-4 mb-4">Quản Lý Đơn Hàng</h3>
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
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const isDisabled = order.status === "cancelled" || order.status === "shipped";
                return (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.orderCode}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.user?.name ?? "Không có tên"}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={selectedStatuses[order.id] || order.status}
                        onChange={(e) =>
                          handleSelectChange(order.id, e.target.value)
                        }
                        disabled={isDisabled}
                      >
                        {OrderStatuses.map((status) => (
                          <option key={status.code} value={status.code}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusChange(order.id)}
                        disabled={isDisabled}
                      >
                        Thay đổi
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
