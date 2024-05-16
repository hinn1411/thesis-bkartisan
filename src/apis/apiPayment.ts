import { axiosClient } from './axiosClient';

export const apiPayment = {
  getPaymentLink: async () => {
    try {
      const { data } = await axiosClient.get('/payments');
      // console.log(data);
      
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
