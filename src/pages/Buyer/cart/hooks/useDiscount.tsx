import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiDiscount } from '@apis/apiDiscounts';
import { ToastOptions, toast } from 'react-toastify';
import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from '@components/common/toast/index';
import { CartContext, CartContextType } from 'src/store/CartContext';

export interface DiscountProps {
  code: string;
  value: number;
}
export const useDiscount = () => {
  const { updateDiscountPrice } = useContext(CartContext) as CartContextType;
  const [discount, setDiscount] = useState<string>('');
  const [discountList, setDiscountList] = useState<DiscountProps[]>([]);
  const { mutate } = useMutation({
    mutationKey: ['discounts'],
    mutationFn: apiDiscount.applyDiscount,
    onSuccess: (data) => {
      toast(<Message>Thêm thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setDiscountList((prev) => [
        ...prev,
        { code: data.code, value: data.discountPrice },
      ]);
      updateDiscountPrice(+data.discountPrice);
      setDiscount(``);
    },
    onError: (err) => {
      toast(<Message>{err.message}</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });
  return {
    applyDiscount: mutate,
    discount,
    setDiscount,
    discountList,
  };
};
