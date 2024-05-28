import { axiosClient } from "./axiosClient";

const apiEmail = {
  sendSellerCode: async (email: string) => {
    try {
      const { data } = await axiosClient.post("/email/seller_code", { email });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
export default apiEmail;
