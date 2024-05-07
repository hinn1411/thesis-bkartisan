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
  getFavorites: async (page: number, offset: number, searchTerm: string) => {
    try {
      const { data } = await axiosClient.get('/favorites', {
        params: {
          page,
          offset,
          name: searchTerm,
        },
      });
      console.log(data);
      return data.map((item: any) => ({
        id: item.id,
        productId: item.productId,
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
  toggleFavorites: async (id: number) => {
    try {
      const { data } = await axiosClient.delete(`favorites/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
