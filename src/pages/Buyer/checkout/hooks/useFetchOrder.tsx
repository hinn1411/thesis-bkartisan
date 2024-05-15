import apiOrders from '@apis/apiOrders';
import { useQuery } from '@tanstack/react-query';

export const useFetchOrder = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: apiOrders.getBuyerOrder,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return {
    isFetching,
    order: data,
  };
};
