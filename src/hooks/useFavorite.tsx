import { apiFavorite } from '@apis/apiFavorite';
import { SuccessIcon, WarningIcon } from '../components/common/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export const useFavorite = () => {
  const { mutate } = useMutation({
    mutationFn: (productId: number) => apiFavorite.createFavorite(productId),
    onSuccess: () => {
      toast(<p className="ms-4 text-sm">Bạn đã thêm sản phẩm này</p>, {
        icon: <SuccessIcon />,
        position: 'bottom-right',
        closeButton: false,
        hideProgressBar: true,
        delay: 0,
      });
    },
    onError: () => {
      toast.error(<p className="ms-4 text-sm">Bạn đã thêm sản phẩm này</p>, {
        icon: <WarningIcon />,
        position: 'bottom-right',
        closeButton: false,
        hideProgressBar: true,
        delay: 0,
      });
    },
  });

  // Add username to prevent bugs
  const {
    data: favorites,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: apiFavorite.getFavorites,
    refetchOnWindowFocus: false,
  });
  return {
    favorites,
    isFetching,
    isError,
    mutate,
  };
};
