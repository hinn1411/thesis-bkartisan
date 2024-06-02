import { useQuery } from "@tanstack/react-query";
import apiUsers from "../apis/apiUsers";
import { useContext } from "react";
import { CartContext, CartContextType } from "src/store/CartContext";
export const useUserProfile = () => {
  const { initNumberOfItems, initOriginalPrice } = useContext(
    CartContext
  ) as CartContextType;
  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await apiUsers.getProfile();
      initNumberOfItems(+user?.cartItems || 0);
      initOriginalPrice(+user?.totalPrice || 0);
      return user;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    user,
    isAuthenticated: !!user,
    isPending,
    error,
  };
};
