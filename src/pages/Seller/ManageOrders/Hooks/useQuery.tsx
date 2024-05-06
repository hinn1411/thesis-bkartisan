import { useQuery } from '@tanstack/react-query';
import apiOrders from '../../../../apis/apiOrders';





export const useQueryOrderDetail = (orderId: number) => {
    const { data, isFetching, isSuccess, error } = useQuery({
        queryKey: ['orderDetail', orderId],

        queryFn: async () => {
          return await apiOrders.getOrderDetail(orderId);
        },
      });
      return {
        data,
        isFetching,
        isSuccess,
        error,
      };
};