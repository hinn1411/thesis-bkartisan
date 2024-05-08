import { apiFavorite } from '@apis/apiFavorite';
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
  Message,
  options,
} from '../components/common/toast';
import { useMutation } from '@tanstack/react-query';
import { ToastOptions, toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useModifyFavorite = () => {
  const { mutate } = useMutation({
    mutationFn: (productId: number) => apiFavorite.createFavorite(productId),
    onSuccess: () => {
      toast(<Message>Thêm thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
    },
    onError: (err: AxiosError) => {
      console.log(`useModifyFavorite`);
      console.log(err);
      if (err.response?.status === 400) {
        toast.error(<Message>Bạn đã thêm sản phẩm này</Message>, {
          icon: <WarningIcon />,
          ...(options as ToastOptions),
        });
      }
      if (err.response?.status === 401) {
        toast.error(<Message>Vui lòng đăng nhập</Message>, {
          icon: <ErrorIcon />,
          ...(options as ToastOptions),
        });
      }
    },
  });
  return { mutate };
};
