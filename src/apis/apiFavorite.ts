import { axiosClient } from './axiosClient';

export const apiFavorite = {
  createFavorite: async (username: string, productId: number) => {
    try {
      const { data } = await axiosClient.post('/favorites', {
        username,
        productId,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
