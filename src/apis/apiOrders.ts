import { floor } from 'lodash';
import { axiosClient } from './axiosClient';
// import { ProductProps } from '../pages/Seller/ManageProducts/Hooks/useProductMutation';
export interface IOrders {
  orderId: number;
  seller: string;
  createAt: Date;
  status: string;
  paymentMethod: string;
  isGift: boolean;
  totalPrice: number;
  buyer: string;
}
export interface IOrderProduct {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}
const apiOrders = {
  getBuyerOrder: async () => {
    try {
      const { data } = await axiosClient.get('/orders');
      data.orders = data.orders.map((order: any) => {
        order.items = order.items.map((item: any) => ({
          productImage: item.coverImage,
          productName: item.name,
          finalPrice: floor(item.price * (1 - item.discount / 100)),
          quantity: item.quantity,
        }));
        return order;
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getOrders: async (searchTerm: string, page: number, offset: number) => {
    try {
      const { data } = await axiosClient.get(`/orders`, {
        params: {
          searchTerm: searchTerm,
          page: page,
          offset: offset,
        },
      });
      console.log(`data`, data);

      // console.log(res);
      return data.orders;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getOrderDetail: async (orderId: number) => {
    try {
      const { data } = await axiosClient.get(`/orders/${orderId}`);
      console.log(`data`, data);

      // console.log(res);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getOrdersList: async (searchTerm: string, page: number, offset: number) => {
    
    const data = [[
      1, "Chúng Đức Quang", "Lầu Hội", "Chờ xác nhận", "2024-05-20T04:16:02.160Z", 1
    ], [
      2, "Chúng Đức Quang", "Lầu Hội", "Đã thành công", "2024-05-20T04:16:02.160Z", 2
    ]]

    return data
  },
};

export default apiOrders;
