import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiOrders from '../../../../apis/apiOrders';

export interface usePaginationProps {}

// eslint-disable-next-line react-refresh/only-export-components
const PAGE = 1;
// eslint-disable-next-line react-refresh/only-export-components
const OFFSET = 6;

export const useManageOrderPagination = (searchTerm: string) => {
  const [page, setPage] = useState(PAGE);
  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['orders', page, searchTerm],
    queryFn: async () => {
      return await apiOrders.getSellerOrders(page, OFFSET);
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
