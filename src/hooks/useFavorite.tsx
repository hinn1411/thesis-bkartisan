import { apiFavorite } from '@apis/apiFavorite';
import { useQuery } from '@tanstack/react-query';
import { PAGE, OFFSET } from '@contants/pagination';
import { useState } from 'react';

export const useFavorite = () => {
 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(PAGE);


  // Add username to prevent bugs
  const {
    data: favorites,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['favorites', page],
    queryFn: async () =>
      await apiFavorite.getFavorites(page, OFFSET, searchTerm),
    refetchOnWindowFocus: false,
    initialData: [],
    retry: false
  });

  return {
    favorites,
    isFetching,
    isError,
    refetch,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
  };
};
