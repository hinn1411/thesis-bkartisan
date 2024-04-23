import { formatDate } from "../utils/formatDate";
import { axiosClient } from "./axiosClient";
// import { ProductProps } from '../pages/Seller/ManageProducts/Hooks/useProductMutation';
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
  getProducts: async (
    searchTerm: string,
    page: number,
    offset: number,
    filterTerm: string
  ) => {
    try {
      const { data } = await axiosClient.get(`/products`, {
        params: {
          searchTerm: searchTerm,
          page: page,
          offset: offset,
          filterTerm: filterTerm,
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

  createProduct: async (productData: FormData) => {
    try {
      const response = await axiosClient.post("/products", productData);

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteProduct: async (productIds: number[]) => {
    try {
      const response = await axiosClient.delete("/products", {
        params: { productIds: productIds },
      });

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getProductsList: async (page: number, offset: number, filterOpts: any) => {
    if (filterOpts.endDate != null) {
      filterOpts.endDate = formatDate("yyyy-mm-dd", new Date(filterOpts.endDate));
    }
    if (filterOpts.startDate != null) {
      filterOpts.startDate = formatDate("yyyy-mm-dd", new Date(filterOpts.startDate));
    }
    const { data } = await axiosClient.get(`/products-list`, {
      params: {
        ...filterOpts
      },
    });
    return data;
  },
};

export default apiProducts;
