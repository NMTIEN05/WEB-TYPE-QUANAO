import React, { useState, useEffect } from "react";
import { ICart } from "../../interface/cart";
import { useNavigate } from "react-router-dom";
import "./pay.css"; 

const OrderDetails = () => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number>(0);
  const navigate = useNavigate();

  // Hàm để lấy dữ liệu giỏ hàng và thông tin người dùng từ localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Lấy dữ liệu giỏ hàng
        const cartResponse = await fetch("http://localhost:3000/carts");
        const cartData = await cartResponse.json();
        setCartItems(cartData);

        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Giả sử phí vận chuyển cố định
        const calculatedShippingFee = 30000;
        setShippingFee(calculatedShippingFee);

        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  // Lọc giỏ hàng theo email của người dùng
  const filteredCartItems = user
    ? cartItems.filter(item => item.email === user.email)
    : [];

  // Tính tổng tiền (giá sản phẩm + phí ship)
  const totalAmount = filteredCartItems.reduce(
    (total, item) => total + parseInt(item.price) * item.sl,
    0
  );

  const grandTotal = totalAmount + shippingFee;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const orderData = {
      orderCode: `ORD-${Math.random().toString(36).substr(2, 9)}`,
      orderDate: new Date().toISOString(),
      user: user,
      cartItems: filteredCartItems,
      paymentMethod: paymentMethod,
      shippingFee: shippingFee,
      totalAmount: totalAmount,
      grandTotal: grandTotal,
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Đơn hàng đã được gửi thành công!");
        navigate("/list-orders");
      } else {
        alert("Đã có lỗi xảy ra khi gửi đơn hàng.");
      }
    } catch (err) {
      setError("Lỗi khi gửi đơn hàng.");
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container5 mt-4 mb-10" style={{ maxWidth: "800px", margin: "0 auto", border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
      <h2 className="mb-3">Thông Tin Đơn Hàng</h2>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            {user ? (
              <>
                <p><strong>Khách hàng:</strong> {user.name}</p>
                <p><strong>Địa chỉ Người Nhận:</strong> {user.address}</p>
                <p><strong>Số điện thoại:</strong> {user.sdt}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </>
            ) : (
              <p><strong>Không tìm thấy thông tin người dùng.</strong></p>
            )}

            <h5 className="mt-4">Sản phẩm</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {filteredCartItems.length > 0 ? (
                  filteredCartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.sl}</td>
                      <td>{parseInt(item.price).toLocaleString()}đ</td>
                      <td>{(parseInt(item.price) * item.sl).toLocaleString()}đ</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">Giỏ hàng trống.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mb-3">
              <label htmlFor="payment-method" className="form-label">Phương thức thanh toán:</label>
              <select
                id="payment-method"
                className="form-select"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                required
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="credit_card">Thẻ tín dụng/Ghi nợ</option>
                <option value="vnpay">VNPay</option>
                <option value="momo">MoMo</option>
                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              </select>
            </div>

            <h5 className="mt-3">Phí vận chuyển: <span className="text-danger">{shippingFee.toLocaleString()}đ</span></h5>
            <h5 className="mt-3">Tổng tiền: <span className="text-danger">{grandTotal.toLocaleString()}đ</span></h5>
          </div>
        </div>

        <div className="mt-3 text-center">
          <button type="submit" className="btn btn-success">Thanh Toán</button>
          <a href="#" className="btn btn-secondary ms-2">Quay lại</a>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;
