import { axiosClient } from "./axiosClient";

const apiAddress = {
  getCity: async () => {
    try {
      const { data } = await axiosClient.get("/city");
      return data.map(({ cityId, cityName }: any) => ({
        id: cityId,
        name: cityName,
      }));
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getDistrict: async (cityId: number | undefined) => {
    try {
      console.log(`cityId = ${cityId}`);

      const { data } = await axiosClient.get(`/district/${cityId}`);
      return data.map(({ districtId, districtName }: any) => ({
        id: districtId,
        name: districtName,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getWard: async (districtId: number | undefined) => {
    try {
      console.log(`districtId = ${districtId}`);

      const { data } = await axiosClient.get(`/ward/${districtId}`);
      return data.map(({ wardId, wardName }: any) => ({
        id: wardId,
        name: wardName,
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getCountries: async () => {
    try {
      const { data } = await axiosClient.get("/countries");
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

export default apiAddress;
