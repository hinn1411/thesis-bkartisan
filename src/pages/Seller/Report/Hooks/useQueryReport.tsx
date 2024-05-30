import { useQuery } from '@tanstack/react-query';
import apiReportSeller from '@apis/apiReportSeller';




export const useMonthlyRevenue = (year: number) => {
    const { data, isFetching, isSuccess, error } = useQuery({
        queryKey: ['chartReport', year],
        queryFn: async () => {
          return await apiReportSeller.getMonthlyRevenue(year);
        },
      });
      return {
        data,
        isFetching,
        isSuccess,
        error,
      };
};

export const useProductRevenue = () => {
  const { data, isFetching, isSuccess, error } = useQuery({
      queryKey: ['tableReport'],
      queryFn: async () => {
        return await apiReportSeller.getProductRevenue()
      },

    });
    return {
      data,
      isFetching,
      isSuccess,
      error,
    };
};

