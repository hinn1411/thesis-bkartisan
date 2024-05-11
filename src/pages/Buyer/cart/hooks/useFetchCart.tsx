import apiCart from '@apis/apiCart';
import { useQuery } from '@tanstack/react-query';

export const useCart = () => {
  const { data: cart, isFetching } = useQuery({
    queryKey: ['carts'],
    queryFn: apiCart.getCart,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
  return {
    cart: cart?.data,
    numOfItems: cart?.numOfItems,
    isFetching,
  };
};
