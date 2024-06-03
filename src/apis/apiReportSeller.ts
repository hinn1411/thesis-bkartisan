import { axiosClient } from "./axiosClient";


export interface IChartReport {
    month: number
    totalRevenue: string;
    totalQuantity: string;
  }
  export interface ITableReport {
    name: string
    totalPrice: number;
    quantity: number;
    coverImage: number;
  }

  const apiReportSeller = {
    getMonthlyRevenue: async (year: number) => {
      const { data } = await axiosClient.get(`/report/monthlyRevenue`, {
        params: {
          year: year
        },
      });
  
      return data;
    },
  
    getProductRevenue: async () => {
      const { data } = await axiosClient.get(`/report/productRevenue`);
      return data;
    },

    getReportSale: async () => {
        await axiosClient.get(`/download/reportSale`);
    }
  
  };



  export default apiReportSeller;