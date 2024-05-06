import { axiosClient } from './axiosClient';
export interface IOptions {
    optionId: number,
    optionName: string,
}
const apiOptions = {
  getOptions: async () => {
    try {
      const { data } = await axiosClient.get(`/options`);
      console.log(`data`, data);

      // console.log(res);
      return data.options;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getChildOptions: async (optionTerm: string) => {
    try {
      const { data } = await axiosClient.get(`/child_options`,{
        params: {
          optionTerm: optionTerm,
        },
      });
      console.log(`data child_options`, data);

      // console.log(res);
      return data.options;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default apiOptions;
