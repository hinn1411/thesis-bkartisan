import { useQuery } from '@tanstack/react-query';
import apiUsers from '../apis/apiUsers';
import { useContext } from 'react';
import { CartContext, CartContextType } from 'src/store/cartContext';
export const useUserProfile = () => {
  const { updateNumberOfItems, updateOriginalPrice } = useContext(
    CartContext
  ) as CartContextType;
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await apiUsers.getProfile();
      updateNumberOfItems(+user.cartItems);
      updateOriginalPrice(+user.totalPrice);
      return user;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    user,
    isAuthenticated: !!user,
    isPending,
  };
};
