
import { axiosClient } from './axiosClient';

export type GiftType = 'box' | 'card';

export interface IGift {
    giftId?: number;
    seller: string;
    name: string;
    coverImage: string;
    type: GiftType;
    price: number;
  }

  export const  apiGifts = {
    getGifts: async (type: string, searchTerm: string, page: number, offset: number) => {
      try {
        const { data } = await axiosClient.get(`/gifts`, {
            params: {
              page: page,
              offset: offset,
              type: type,
              searchTerm: searchTerm,
            },
          });
        console.log(data);
  
        // console.log(res);
        return data.gifts;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    updateGift: async (gift: IGift) => {
        try {
            const response = await axiosClient.put(`/gifts`, gift);
            return response.data;
          } catch (err) {
            console.log(err);
            throw err;
          }
    },
    createGift: async (gift: FormData) => {
      try {
          const response = await axiosClient.post(`/gifts`, gift);
          return response.data;
        } catch (err) {
          console.log(err);
          throw err;
        }
  },
    deleteGift: async (giftIds: number[]) => {
      try {
        const response = await axiosClient.delete(`/gifts`, {
            params: { giftIds: giftIds },
          });
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getGiftDetail: async (giftId: number) => {
        try {
          const response = await axiosClient.get(`/gifts/${giftId}`);
          return response.data;
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
  };