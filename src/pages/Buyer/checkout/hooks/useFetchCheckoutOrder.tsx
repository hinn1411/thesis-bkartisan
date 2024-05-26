import apiOrders from '@apis/apiOrders';
import { useQuery } from '@tanstack/react-query';

export const useFetchCheckoutOrder = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: apiOrders.getCheckoutOrder,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data);

  return {
    isFetching,
    data
  };
};
