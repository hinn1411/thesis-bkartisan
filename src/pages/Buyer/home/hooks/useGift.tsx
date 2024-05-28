import { useQuery } from '@tanstack/react-query';
import apiCategorys from '@apis/apiCategory';

export const useGift = () => {
  const { data: gifts, isPending } = useQuery({
    queryKey: ['gifts'],
    queryFn: apiCategorys.getGifts,
    refetchOnWindowFocus: false
  });
  return {
    gifts,
    isPending,
  };
};
