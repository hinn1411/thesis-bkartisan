import apiProducts from '@apis/apiProducts';
import { useQuery } from '@tanstack/react-query';

export const useFilter = (queryObj) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['products', queryObj],
    queryFn: async () => {
      return await apiProducts.searchProducts(queryObj);
    },
    refetchOnWindowFocus: false
  });
  return { data, isFetching, isError };
};
