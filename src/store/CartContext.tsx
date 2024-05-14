import { FC, ReactNode, createContext, useState } from 'react';

export interface ICart {
  numberOfItems: number;
  originalPrice: number;
  discountPrice: number;
}

export type CartContextType = {
  numberOfItems: number;
  discountPrice: number;
  originalPrice: number;
  updateNumberOfItems: (newQuantity: number) => void;
  updateDiscountPrice: (newPrice: number) => void;
  updateOriginalPrice: (price: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const updateNumberOfItems = (newQuantity: number) => {
    setNumberOfItems((prev) => prev + newQuantity);
  };
  const updateDiscountPrice = (newPrice: number) => {
    setDiscountPrice((prev) => prev + newPrice);
  };
  const updateOriginalPrice = (price: number) => {
    setOriginalPrice((prev) => prev + price);
  };
  return (
    <CartContext.Provider
      value={{
        numberOfItems,
        originalPrice,
        discountPrice,
        updateNumberOfItems,
        updateDiscountPrice,
        updateOriginalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
