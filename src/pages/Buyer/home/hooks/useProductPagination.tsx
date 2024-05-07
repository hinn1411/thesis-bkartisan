import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PAGE, OFFSET } from '../../../../constants/pagination';
import apiProducts from '@apis/apiProducts';
export interface usePaginationProps {}

export const useProductPagination = () => {
  const searchTerm = '';
  const [page, setPage] = useState(PAGE);
  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      return await apiProducts.getProducts(searchTerm, page, OFFSET);
    },
    refetchOnWindowFocus: false,
  });
  return {
    page,
    setPage,
    data,
    isFetching,
    isSuccess,
    error,
  };
};
