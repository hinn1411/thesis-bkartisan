import { AxiosError } from 'axios';
import { axiosClient } from './axiosClient';

export interface IQueryDiscountObject {
  type: string;
  filter: string;
}
export type DiscountType = 'fixed' | 'percent' | 'bill';
export interface IDiscount {
  id?: number;
  code: string;
  startedAt: string;
  validUntil: string;
  type: string;
  quantity: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  details: {
    value: number;
    lowerBound: number;
  };
}

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

  getDiscounts: async (page: number, offset:number, query: IQueryDiscountObject) => {
    try {
      const { data } = await axiosClient.get(`/discounts`, {
        params: {
          page: page,
          offset: offset,
          type: query.type,
          filter: query.filter
        },
      });

      console.log(data)

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getDiscountDetail: async (discountId: number) => {
    try {
      const data = await axiosClient.get(`/discounts/${discountId}`);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  updateDiscount: async (discount: any) => {
    try {
      const response = await axiosClient.patch(`/discounts/${discount.discountId}`, discount);

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteDiscount: async (discountIds: number) => {
    try {
      const response = await axiosClient.delete(`/discounts/${discountIds}`);

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createDiscount: async (discount: any) => {
    try {
      const response = await axiosClient.post(`/discounts`, discount);

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

};
