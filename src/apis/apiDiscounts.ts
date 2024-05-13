import { AxiosError } from 'axios';
import { axiosClient } from './axiosClient';

export const apiDiscount = {
  applyDiscount: async (code: string) => {
    try {
      const { data } = await axiosClient.post(`/discounts/${code}`);
      console.log(data);
      return data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.response.data.msg);
    }
  },
  clearDiscount: async () => {
    try {
      return await axiosClient.delete('/discounts/reset');
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
