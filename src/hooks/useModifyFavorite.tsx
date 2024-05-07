import { apiFavorite } from '@apis/apiFavorite';
import { ErrorIcon, SuccessIcon, WarningIcon } from '../components/common/toast';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useModifyFavorite = () => {
  const { mutate } = useMutation({
    mutationFn: (productId: number) => apiFavorite.createFavorite(productId),
    onSuccess: () => {
      toast(<p className="ms-4 text-sm">Thêm thành công</p>, {
        icon: <SuccessIcon />,
        position: 'bottom-right',
        closeButton: false,
        hideProgressBar: true,
        delay: 0,
      });
    },
    onError: (err: AxiosError) => {
      console.log(`useModifyFavorite`);
      console.log(err);
      if (err.response?.status === 400) {
        toast.error(<p className="ms-4 text-sm">Bạn đã thêm sản phẩm này</p>, {
          icon: <WarningIcon />,
          position: 'bottom-right',
          closeButton: false,
          hideProgressBar: true,
          delay: 0,
        });
      }
      if (err.response?.status === 401) {
        toast.error(<p className="ms-4 text-sm">Vui lòng đăng nhập</p>, {
          icon: <ErrorIcon />,
          position: 'bottom-right',
          closeButton: false,
          hideProgressBar: true,
          delay: 0,
        });
      }
    },
  });
  return { mutate };
};
