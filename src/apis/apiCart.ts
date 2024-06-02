import { axiosClient } from "./axiosClient";

export interface IItem {
  id?: number;
  productId: number;
  quantity: number;
  note?: string;
}

export interface IPartialItem {
  productId: number;
}

const apiCart = {
  addToCart: async ({ productId, quantity }: IItem) => {
    console.log(`productId = ${productId}, quantity = ${quantity}`);

    try {
      const { data } = await axiosClient.post("/carts", {
        productId,
        quantity,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  addGift: async (gift) => {
    try {
      const { data } = await axiosClient.post("/carts/gift", gift);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err.response.data.msg);
    }
  },
  deleteGift: async (parentId: string) => {
    try {
      const { data } = await axiosClient.delete(`/carts/gift/${parentId}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getCart: async () => {
    try {
      const { data } = await axiosClient.get("/carts");
      console.log(data);
      const mappedItems = data.items.map((item: any) => {
        if (!item.isGift) {
          return {
            productId: item.productId,
            sellerImage: item.avatar,
            sellerName: item.username,
            itemName: item.name,
            itemImage: item.coverImage,
            note: item.note ?? "",
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            currentPrice: (1 - item.discount / 100) * item.price,
            originalPrice: item.price,
            percentageOfDiscount: item.discount,
            isGift: item.isGift,
            sellerUsername: item.user,
          };
        }
        return item;
      });
      return {
        numOfItems: data.numOfItems,
        data: mappedItems,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateCart: async ({ productId, quantity, note }: IItem) => {
    try {
      const { data } = await axiosClient.patch(`/carts/${productId}`, {
        note,
        quantity,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteCart: async ({ productId }: IPartialItem) => {
    try {
      const { data } = await axiosClient.delete(`/carts/${productId}`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default apiCart;
