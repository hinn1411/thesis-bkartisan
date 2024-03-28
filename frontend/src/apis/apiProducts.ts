import { axiosClient } from './axiosClient';
export interface IProducts {
  productId: number;
  price: number;
  name: string;
  seller: string;
  coverImage: string;
  numberOfStar: number;
  numberOfRating: number;
  discount: number;
}
const apiProducts = {
  getProducts: async (searchTerm:string, page: number, offset: number) => {
    try {
      const { data } = await axiosClient.get(`/products`, {
        params: {
          searchTerm: searchTerm,
          page: page,
          offset: offset,
        },
      });
      console.log(`data`, data);

      // console.log(res);
      return data.products.map(
        ({
          productId,
          price,
          name,
          seller,
          coverImage,
          numberOfStar,
          numberOfRating,
          discount,
        }: IProducts) => ({
          id: productId,
          name,
          percentageOfDiscount: discount,
          srcImage: coverImage,
          seller,
          currentCost: price * (1 - discount / 100),
          originalCost: price,
          star: numberOfStar,
          numOfRating: numberOfRating,
        })
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

};

export default apiProducts;
