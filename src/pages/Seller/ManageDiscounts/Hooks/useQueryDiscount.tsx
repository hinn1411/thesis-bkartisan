import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiDiscount, IQueryDiscountObject } from '@apis/apiDiscounts';

export interface usePaginationProps {}

// eslint-disable-next-line react-refresh/only-export-components
const PAGE = 1;
// eslint-disable-next-line react-refresh/only-export-components
const OFFSET = 6;

export const useDiscountPagination = (query: IQueryDiscountObject) => {
  const [page, setPage] = useState(PAGE);
  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['alldiscounts', page, query],
    queryFn: async () => {
      return await apiDiscount.getDiscounts(page, OFFSET, query)
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

export const useQueryDiscountDetail = (discountId: number) => {
  const { data, isFetching, isSuccess, error } = useQuery({
      queryKey: ['discountDetail', discountId],

      queryFn: async () => {
        return await apiDiscount.getDiscountDetail(discountId);
      },
    });
    return {
      data,
      isFetching,
      isSuccess,
      error,
    };
};
