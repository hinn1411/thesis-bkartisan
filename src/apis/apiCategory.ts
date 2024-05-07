
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
      return data.map(
        ({ categoryId, name, image, isSelected, level }: any) => ({
          id: categoryId,
          name,
          image,
          isSelected,
          level,
        })
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getGifts: async () => {
    try {
      const { data } = await axiosClient.get('/categories/gifts');
      return data.map(({ categoryId, name, image, level }: any) => ({
        id: categoryId,
        name,
        image,
        level,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getCategoryChildren: async (id: number) => {
    try {
      const { data } = await axiosClient.post('/categories/children', {
        id,
      });
      console.log(`category children`, data);

      return data.map(({ categoryId, name, image, level }) => ({
        id: categoryId,
        name,
        image,
        level,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default apiCategorys;
