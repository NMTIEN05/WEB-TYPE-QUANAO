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

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(API_URL);
                setCartItem(response.data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, []);

    const updateCartItemInDB = async (id: number, updatedItem: CartItem) => {
        try {
            await axios.put(`${API_URL}/${id}`, updatedItem);
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };

    const addCartItem = async (product: ProductItem) => {
        setCartItem((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            let newCart;
            if (existingItem) {
                newCart = prev.map((item) =>
                    item.id === product.id ? { ...item, sl: item.sl + 1 } : item
                );
                updateCartItemInDB(product.id, newCart.find((item) => item.id === product.id)!);
            } else {
                const newItem = { ...product, sl: 1 };
                newCart = [...prev, newItem];
                axios.post(API_URL, newItem).catch((error) => console.error("Error adding product:", error));
            }
            return newCart;
        });
    };

    const increaseQty = (id: number) => {
        setCartItem((prev) => {
            const newCart = prev.map((item) =>
                item.id === id ? { ...item, sl: item.sl + 1 } : item
            
            );
            
            updateCartItemInDB(id, newCart.find((item) => item.id === id)!);
            
            return newCart;
        });
    };

    const decreaseQty = (id: number) => {
        setCartItem((prev) => {
            const newCart = prev.map((item) =>
                item.id === id ? { ...item, sl: item.sl > 1 ? item.sl - 1 : 1 } : item
            );
            updateCartItemInDB(id, newCart.find((item) => item.id === id)!);
            return newCart;
        });
    };

    const removeCartItem = (id: number) => {
        setCartItem((prev) => {
            const newCart = prev.filter((item) => item.id !== id);
            axios.delete(`${API_URL}/${id}`).catch((error) => console.error("Error removing product:", error));
            return newCart;
        });
    };

    const clearCart = async () => {
        setCartItem([]);
        try {
            const requests = cartItem.map((item) => axios.delete(`${API_URL}/${item.id}`));
            await Promise.all(requests);
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