import { TiEdit } from 'react-icons/ti';
import { axiosClient } from './axiosClient';

export const apiFavorite = {
  createFavorite: async (productId: number) => {
    try {
      const { data } = await axiosClient.post('/favorites', {
        productId,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getFavorites: async () => {
    try {
      const { data } = await axiosClient.get('/favorites');
      console.log(data);
      return data.map((item) => ({
        id: item.id,
        image: item.coverImage,
        name: item.name,
        numberOfStars: item.numberOfStar,
        numberOfRatings: item.numberOfRating,
        currentPrice: (1 - item.discount / 100) * item.price,
        originalPrice: item.price,
        seller: item.seller,
        discount: item.discount,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
