interface IOrder {
  id:string
    orderCode: string;
    orderDate: string;
    user: {
      name: string;
      sdt: string;
      email: string;
      address: string;
      role: string;
    };
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
    status: string;  // Trạng thái có thể thay đổi (ví dụ: "Đang xử lý", "Đang vận chuyển", "Đã giao", "Đã hủy")
  }
  