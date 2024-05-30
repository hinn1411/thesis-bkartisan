import apiCart from '@apis/apiCart';
import { useMutation } from '@tanstack/react-query';
export const useHandleCart = () => {

  const { mutate: updateItem } = useMutation({
    mutationFn: apiCart.updateCart,
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: apiCart.deleteCart,
    onSuccess: () => {
      location.reload();
    }
  });
  return {
    updateCart: updateItem,
    deleteCart: deleteItem,
  };
};
