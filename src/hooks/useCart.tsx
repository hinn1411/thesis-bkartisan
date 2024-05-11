import apiCart from '@apis/apiCart';
import { ErrorIcon, Message, SuccessIcon, options } from '@components/common/toast';
import { useMutation } from '@tanstack/react-query';
import { ToastOptions, toast } from 'react-toastify';
export const useCart = () => {
  const { mutate } = useMutation({
    mutationFn: apiCart.addToCart,
    onSuccess: () => {
      toast.success(<Message>Thêm thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions)
      })
    },
    onError: () => {
      toast.error(<Message>Vui lòng thử lại</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    }
  });
  return {
    addToCart: mutate,
  };
};
