import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditOrderPage = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`);
        setOrder(response.data); // Lưu dữ liệu vào state
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]); // Gọi lại mỗi khi id thay đổi

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/orders/${id}`, order); // Cập nhật đơn hàng
      alert("Cập nhật đơn hàng thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật đơn hàng", err);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Chỉnh Sửa Đơn Hàng {order?.orderCode}</h3>
      <div>
        <label>Trạng Thái:</label>
        <select
          value={order?.status}
          onChange={(e) => setOrder({ ...order, status: e.target.value })}
        >
          <option value="1">Đang xử lý</option>
          <option value="2">Đã giao</option>
          <option value="3">Đã hủy</option>
        </select>
      </div>

      <button onClick={handleSave} className="btn btn-success mt-3">Lưu</button>
    </div>
  );
}

export default EditOrderPage;
