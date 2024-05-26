import { axiosClient } from "./axiosClient";

export const apiPayment = {
  getPaymentLink: async () => {
    try {
      const { data } = await axiosClient.get("/payments");
      // console.log(data);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  handleSingleOrderCheckout: async (orderInfor: {
    orderId: string;
    totalPrice: number;
  }) => {
    const { orderId, totalPrice } = orderInfor;
    try {
      const { data } = await axiosClient.post(`/payments/single_order`, {
        orderId,
        totalPrice,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
