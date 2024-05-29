import { useQuery } from '@tanstack/react-query';
import apiOrders from '../../../../apis/apiOrders';





export const useQuerySellerOrderDetail = (orderId: string) => {
    const { data, isFetching, isSuccess, error, refetch } = useQuery({
        queryKey: ['sellerOrderDetail', orderId],

        queryFn: async () => {
          return await apiOrders.getSellerOrderDetail(orderId);
        },
      });
      return {
        data,
        isFetching,
        isSuccess,
        error,
        refetch
      };
};