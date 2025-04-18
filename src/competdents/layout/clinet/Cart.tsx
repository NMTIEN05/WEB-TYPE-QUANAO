import React from "react";
import "./cart.css";
import { useShoppingContext } from "../contexts.tsx/ShoppingContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItem, increaseQty, decreaseQty, removeCartItem } = useShoppingContext();

    const storedUser = localStorage.getItem("user");
    let userEmail = "";
    if (storedUser) {
        const user = JSON.parse(storedUser);
        userEmail = user.email || "";
    }

    // Lọc giỏ hàng theo email
    const filteredCartItems = cartItem.filter(item => item.email === userEmail);
    const shippingFee = 0;

    // Tính toán tổng tiền dựa trên các sản phẩm đã lọc
    const totalPrice = filteredCartItems.reduce((total, item) => total + item.sl * item.price, 0);

    return (
        <div>
            <h2>Giỏ hàng của bạn</h2>
            <div className="cart-container">
                {filteredCartItems.length > 0 ? (
                    filteredCartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} width={80} />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>Giá: {item.price.toLocaleString()} VNĐ</p>
                                <p><strong>Tổng: {(item.price * item.sl).toLocaleString()} VNĐ</strong></p>
                                <div className="quantity-control">
                                    <button onClick={() => decreaseQty(item.id)}>-</button>
                                    <span>{item.sl}</span>
                                    <button onClick={() => increaseQty(item.id)}>+</button>
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => removeCartItem(item.id)}>Xóa</button>
                        </div>
                    ))
                ) : (
                    <p>Giỏ hàng trống.</p>
                )}
                <p className="total">Phí Ship: <span>{shippingFee.toLocaleString()}</span>đ</p>
                <p className="total">Tổng Thanh Toán: <span>{totalPrice.toLocaleString()}</span>đ</p>
                <div className="checkout-container">
                    <Link className="checkout" to={"/order-detel"}>Mua Ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
