import { floor } from "lodash";
import { axiosClient } from "./axiosClient";
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
  getCheckoutOrder: async () => {
    try {
      const { data } = await axiosClient.get("/orders");
      data.orders = data.orders.map((order) => {
        order.items = order.items.map((item) => ({
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
  getBuyerOrders: async (status: string) => {
    console.log(`status = ${status}`);
    const queryObject: any = {};
    if (status) {
      queryObject["status"] = status;
    }
    try {
      const { data } = await axiosClient.get("/orders/buyer", {
        params: queryObject,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getSellerOrders: async (page: number, offset: number) => {
    try {
      const { data } = await axiosClient.get("/orders/seller", {
        params: {
          page: page,
          offset: offset,
        },
      });
      console.log(data)
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  saveOrder: async () => {
    try {
      const { data } = await axiosClient.post("/orders/save");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  cancelOrder: async ({ orderId }: { orderId: string }) => {
    try {
      const { data } = await axiosClient.post("/payments/refund", {
        orderId: orderId,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  changeOrderState: async ({ orderId }: { orderId: string }) => {
    try {
      const { data } = await axiosClient.post("/orders/state", {
        orderId: orderId,
      });
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

  getSellerOrderDetail: async (orderId: string) => {
    try {
      const { data } = await axiosClient.get(`/orders/seller/${orderId}`);
      console.log(`data`, data);

      // console.log(res);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getOrdersList: async (page: number, offset: number, filterOpts: any) => {
    const { data } = await axiosClient.get(`/orders/admin`, {
      params: {
        page: page,
        offset: offset,
        ...filterOpts
      },
    });

    return data;
  },
};

export default apiOrders;
