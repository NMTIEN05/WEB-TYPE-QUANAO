export interface OrderStatus {
    code: string;
    label: string;
  }
  export const OrderStatuses: OrderStatus[] = [
    { code: 'pending', label: 'Chờ xác nhận' },
    { code: 'Đang xử lý', label: 'Đang xử lý' },
    { code: 'shipped', label: 'Đã giao hàng' },
    { code: 'delivered', label: 'Đã nhận hàng' },
    { code: 'Hoàn thành', label: 'Hoàn thành' },
    { code: 'Đã thanh toán', label: 'Đã thanh toán' },
    { code: 'cancelled', label: 'Đã hủy' },
  ];
  