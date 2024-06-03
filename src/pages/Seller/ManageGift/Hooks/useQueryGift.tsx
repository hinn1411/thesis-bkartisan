import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiGifts } from '@apis/apiGift';

export interface usePaginationProps {}

// eslint-disable-next-line react-refresh/only-export-components
const PAGE = 1;
// eslint-disable-next-line react-refresh/only-export-components
const OFFSET = 6;

export const useGiftPagination = (type: string, searchTerm: string) => {
  const [page, setPage] = useState(PAGE);
  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['allGifts', page, searchTerm],
    queryFn: async () => {
      return await apiGifts.getGifts(type, searchTerm, page, OFFSET)
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

export const useGiftDetail = (giftId: number) => {
  const { data, isFetching, isSuccess, error } = useQuery({
      queryKey: ['discountDetail', giftId],
      queryFn: async () => {
        return await apiGifts.getGiftDetail(giftId)
      },
    });
    return {
      data,
      isFetching,
      isSuccess,
      error,
    };
};
