import React, { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  categorys: string;
  describe: string;
  sl: number;
}

// Định nghĩa kiểu dữ liệu cho người dùng
interface IUser {
  name: string;
  email: string;
  sdt: string;
  id: number;
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
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
  status: string;
}

const OrdersList = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);  // State để lưu danh sách các đơn hàng
  const [loading, setLoading] = useState(true);  // State để theo dõi quá trình tải dữ liệu
  const [error, setError] = useState<string | null>(null);  // State để lưu thông tin lỗi

  // Lấy thông tin người dùng từ localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log("Thông tin người dùng từ localStorage: ", user);

  // Hàm lấy dữ liệu các đơn hàng từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/orders");  // Địa chỉ API lấy danh sách đơn hàng
        const data = await response.json();
        console.log("Dữ liệu trả về từ API: ", data);  // Kiểm tra dữ liệu trả về

        if (Array.isArray(data)) {
          setOrders(data);  // Nếu dữ liệu là mảng, cập nhật danh sách đơn hàng
        } else {
          setError("Dữ liệu đơn hàng không hợp lệ.");
        }
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu.");
        setLoading(false);
      }
    };

    fetchOrders();  // Gọi hàm lấy đơn hàng khi component mount
  }, []);

  // Kiểm tra nếu có thông tin người dùng và lọc các đơn hàng dựa trên email của người dùng
  const filteredOrders = user ? orders.filter(order => order.user.email === user.email) : [];

  console.log("Filtered Orders: ", filteredOrders); // Kiểm tra mảng đơn hàng đã được lọc

  // Hàm để hiển thị danh sách đơn hàng
  if (loading) {
    return <div>Đang tải danh sách đơn hàng...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container5 mt-4 mb-10" style={{ maxWidth: "800px", margin: "0 auto", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
      <h2 className="mb-3">Thông Tin Đơn Hàng</h2>

      {/* Nếu không có đơn hàng nào được tìm thấy */}
      {filteredOrders.length === 0 && (
        <div>Không có đơn hàng nào với email: {user?.email}</div>
      )}

      {/* Duyệt qua các đơn hàng */}
      {filteredOrders.map((order) => (
        <div key={order.id} className="card mb-4">
          <div className="card-body">
            {/* Hiển thị mã đơn hàng, ngày đặt và trạng thái */}
            <p><strong>Mã Đơn:</strong> {order.orderCode}</p>
            <p><strong>Ngày Đặt:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>
              <strong>Trạng Thái:</strong> 
              <span className={order.status === "Đang xử lý" ? "text-warning" : ""}>
                {order.status || "Đang xử lý"}
              </span>
            </p>
            <p><strong>Phương Thức Thanh Toán:</strong> {order.paymentMethod}</p>

            {/* Thông tin người dùng */}
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
                {/* Duyệt qua sản phẩm trong mỗi đơn hàng */}
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

            {/* Hiển thị phí vận chuyển và tổng tiền */}
            <h5 className="mt-3">Phí Vận Chuyển: <span className="text-danger">{order.shippingFee.toLocaleString()}đ</span></h5>
            <h5 className="mt-3">Tổng Tiền: <span className="text-danger">{order.grandTotal.toLocaleString()}đ</span></h5>
          </div>
        </div>
      ))}

      <div className="mt-3 text-center">
        <a href="#" className="btn btn-secondary ms-2">Quay lại</a>
      </div>
    </div>
  );
};

export default OrdersList;
