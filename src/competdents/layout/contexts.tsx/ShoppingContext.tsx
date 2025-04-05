import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/carts";

type ShoppingContextProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: number;
    name: string;
    price: number;
    sl: number;
    image: string;
};

type ProductItem = {
    id: number;
    name: string;
    price: number;
    image: string;
};

interface ShoppingContextType {
    cartQty: number;
    totalPrice: number;
    cartItem: CartItem[];
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    addCartItem: (item: ProductItem) => void;
    removeCartItem: (id: number) => void;
    clearCart: () => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingContext = () => {
    const context = useContext(ShoppingContext);
    if (!context) {
        throw new Error("useShoppingContext must be used within a ShoppingContextProvider");
    }
    return context;
};

export const ShoppingContextProvider = ({ children }: ShoppingContextProviderProps) => {
    const [cartItem, setCartItem] = useState<CartItem[]>([]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(API_URL);
            setCartItem(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addCartItem = async (product: ProductItem) => {
        try {
            const existingItem = cartItem.find((item) => item.id === product.id);
            
            // Lấy thông tin người dùng từ localStorage
            const storedUser = localStorage.getItem("user");
            let userEmail = "";
            if (storedUser) {
                const user = JSON.parse(storedUser); // Phân tích chuỗi JSON
                userEmail = user.email || ""; // Lấy email hoặc gán chuỗi rỗng nếu không có
            }
    
            if (existingItem) {
                const updatedItem = { ...existingItem, sl: existingItem.sl + 1, email: userEmail };
                await axios.put(`${API_URL}/${product.id}`, updatedItem);
            } else {
                await axios.post(API_URL, { ...product, sl: 1, email: userEmail });
            }
            
            fetchCart(); // Cập nhật lại giỏ hàng sau khi API hoàn thành
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        }
    };
    

    const increaseQty = async (id: number) => {
        try {
            const item = cartItem.find((item) => item.id === id);
            if (!item) return;

            const updatedItem = { ...item, sl: item.sl + 1 };
            await axios.put(`${API_URL}/${id}`, updatedItem);
            fetchCart(); // Cập nhật lại giỏ hàng sau khi API hoàn thành
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const decreaseQty = async (id: number) => {
        try {
            const item = cartItem.find((item) => item.id === id);
            if (!item || item.sl <= 1) return;

            const updatedItem = { ...item, sl: item.sl - 1 };
            await axios.put(`${API_URL}/${id}`, updatedItem);
            fetchCart(); // Cập nhật lại giỏ hàng sau khi API hoàn thành
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    const removeCartItem = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCart(); // Cập nhật lại giỏ hàng sau khi API hoàn thành
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    const clearCart = async () => {
        try {
            await Promise.all(cartItem.map((item) => axios.delete(`${API_URL}/${item.id}`)));
            fetchCart(); // Cập nhật lại giỏ hàng sau khi API hoàn thành
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    return (
        <ShoppingContext.Provider
            value={{
                cartItem,
                cartQty: cartItem.length,
                totalPrice: cartItem.reduce((total, item) => total + item.sl * item.price, 0),
                increaseQty,
                decreaseQty,
                addCartItem,
                removeCartItem,
                clearCart,
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
};

export default ShoppingContext;
