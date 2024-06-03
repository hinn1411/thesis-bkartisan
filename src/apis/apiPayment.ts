import { z } from "zod";
import { axiosClient } from "./axiosClient";
import { AddressChema } from "src/pages/Buyer/gift/components/AddressSchema";

type Address = z.infer<typeof AddressChema>;

export const apiPayment = {
  getPaymentLink: async (address: Address) => {
    try {
      const { data } = await axiosClient.post("/payments", address);
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
