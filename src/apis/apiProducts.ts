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
export interface IProductsOfSeller {
  productId: number;
  price: number;
  name: string;
  seller: string;
  coverImage: string;
  quantity: number;
  status: string;
}
const apiProducts = {
  getProducts: async (
    searchTerm: string,
    page: number,
    offset: number,
    filterTerm?: string
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
  getProductsOfSeller: async (
    searchTerm: string,
    page: number,
    offset: number,
    status: string,
    isSoldOut: boolean | null
  ) => {
    try {
      const { data } = await axiosClient.get(`/seller/products`, {
        params: {
          searchTerm: searchTerm,
          page: page,
          offset: offset,
          status: status,
          isSoldOut: isSoldOut,
        },
      });
      console.log(`data`, data);

      // console.log(res);
      return data.products;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getProductDetails: async (productId: string | undefined) => {
    try {
      const { data } = await axiosClient.get(`/products/${productId}`);
      // return data;
      return {
        id: productId,
        name: data.name,
        assets: data.assets,
        comments: data.comments,
        categories: data.categories,
        introduction: data.introduction,
        description: data.description,
        seller: data.seller,
        sellerName: data.sellerName,
        sellerImage: data.avatar,
        currentCost: data.price * (1 - data.discount / 100),
        discount: data.discount,
        isOnSale: data.isOnSale,
        originalCost: data.price,
        star: data.numberOfStar,
        numOfRating: data.numberOfRating,
        status: data.status,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  searchProducts: async (searchObject) => {
    try {
      const { data } = await axiosClient.get("/products/search", {
        params: searchObject,
      });
      return data.map(
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
      filterOpts.endDate = formatDate(
        "yyyy-mm-dd",
        new Date(filterOpts.endDate)
      );
    }
    if (filterOpts.startDate != null) {
      filterOpts.startDate = formatDate(
        "yyyy-mm-dd",
        new Date(filterOpts.startDate)
      );
    }
    const { data } = await axiosClient.get(`/products-list`, {
      params: {
        page,
        offset,
        ...filterOpts,
      },
    });
    return data;
  },

  getReviewProductsList: async (
    page: number,
    offset: number,
    filterOpts: any
  ) => {
    if (filterOpts.endDate != null) {
      filterOpts.endDate = formatDate(
        "yyyy-mm-dd",
        new Date(filterOpts.endDate)
      );
    }
    if (filterOpts.startDate != null) {
      filterOpts.startDate = formatDate(
        "yyyy-mm-dd",
        new Date(filterOpts.startDate)
      );
    }
    const { data } = await axiosClient.get(`/review-products-list`, {
      params: {
        page,
        offset,
        ...filterOpts,
      },
    });

    return data;
  },

  getReviewProductDetails: async (productId: string | undefined) => {
    const { data } = await axiosClient.get(`/review-products/${productId}`);

    return {
      id: productId,
      name: data.name,
      assets: data.assets,
      introduction: data.introduction,
      description: data.description,
      seller: data.seller,
      sellerName: data.sellerName,
      sellerImage: data.avatar,
      currentCost: data.price * (1 - data.discount / 100),
      discount: data.discount,
      isOnSale: data.isOnSale,
      originalCost: data.price,
      star: data.numberOfStar,
      numOfRating: data.numberOfRating,
      status: data.status,
      reviewResponse: data.reviewResponse,
    };
  },
  reviewProduct: async (id, accepted, response) => {
    const body = {
      accepted,
    };
    if (response) body.response = response;
    const { data } = await axiosClient.patch(`/review-products/${id}`, body);

    return data;
  },
};

export default apiProducts;
