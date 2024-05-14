
import { axiosClient } from './axiosClient';

export type TransportType = 'free' | 'fix' | "";

export interface ITransport {
    transportId: number;
    seller: string;
    type: TransportType;
    location: string;
    price: number;
    pricePerItem: number;
    deliveryTime: string;
  }

const apiTransports = {
    getTransports: async () => {
      try {
        const { data } = await axiosClient.get(`/transports`);
        console.log(data);
  
        // console.log(res);
        return data.transports;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    updateTransports: async (transports: ITransport[]) => {
        try {
            const response = await axiosClient.put(`/transports`, transports);
            return response.data;
          } catch (err) {
            console.log(err);
            throw err;
          }
    },
    createTransport: async (transports: ITransport) => {
      try {
          const response = await axiosClient.post(`/transports`, transports);
          return response.data;
        } catch (err) {
          console.log(err);
          throw err;
        }
  },
    deleteTransport: async (transportId: number) => {
      try {
        const response = await axiosClient.delete(`/transports/${transportId}`);
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  };
  
  export default apiTransports;