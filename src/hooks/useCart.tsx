import apiCart from '@apis/apiCart';
import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from '@components/common/toast';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { ToastOptions, toast } from 'react-toastify';
import { CartContext, CartContextType } from 'src/store/cartContext';
export const useCart = () => {
  const { updateNumberOfItems } = useContext(CartContext) as CartContextType;
  const { mutate } = useMutation({
    mutationFn: apiCart.addToCart,
    onSuccess: () => {
      updateNumberOfItems(1);
      toast.success(<Message>Thêm thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
    },
    onError: () => {
      toast.error(<Message>Vui lòng thử lại</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });
  return {
    addToCart: mutate,
  };
};
