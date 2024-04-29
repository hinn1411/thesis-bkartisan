import { axiosClient } from './axiosClient';
export interface ICategorys {
  name: string;
}
const apiCategorys = {
  getCategorys: async () => {
    try {
      const { data } = await axiosClient.get(`/categorys`);
      console.log(data);

      // console.log(res);
      return data.categorys;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getCategoryByLevel: async (level: number) => {
    try {
      const { data } = await axiosClient.get(`/categories/${level}`);
      return data.map(({ categoryId, name, image, isSelected }: any) => ({
        id: categoryId,
        name,
        image,
        isSelected,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getGifts: async () => {
    try {
      const { data } = await axiosClient.get('/categories/gifts');
      return data.map(({ categoryId, name, image }: any) => ({
        id: categoryId,
        name,
        image,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default apiCategorys;
