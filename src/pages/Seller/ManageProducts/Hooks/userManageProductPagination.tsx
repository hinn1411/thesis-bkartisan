import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiProducts from '../../../../apis/apiProducts';

export interface usePaginationProps {}

// eslint-disable-next-line react-refresh/only-export-components
const PAGE = 1;
// eslint-disable-next-line react-refresh/only-export-components
const OFFSET = 6;

export const useManageProductPagination = (searchTerm: string, filterTerm: string) => {
  const [page, setPage] = useState(PAGE);
  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['products', page, searchTerm, filterTerm],
    queryFn: async () => {
      return await apiProducts.getProducts(searchTerm, page, OFFSET, filterTerm);
    },
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


