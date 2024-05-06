
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
  getOrders: async (searchTerm:string, page: number, offset: number) => {
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




};

export default apiOrders;
