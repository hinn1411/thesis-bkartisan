import { useState } from "react";

export const useOrderDetails = () => {
  const [isOpenOrderDetailModal, setIsOpenOrderDetailModal] = useState(false);

  return {
    isOpenOrderDetailModal,
    setIsOpenOrderDetailModal,
  };
};
