import { useMutation } from '@tanstack/react-query';
import { apiDiscount } from '@apis/apiDiscounts';

export const useHandleDiscount = () => {
  const { mutate: clearDiscount } = useMutation({
    mutationFn: apiDiscount.clearDiscount,
  });
  return {
    clearDiscount,
  };
};
