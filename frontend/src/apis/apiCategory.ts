import { axiosClient } from './axiosClient';
export interface ICategorys {
    name: string,
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

};

export default apiCategorys;
