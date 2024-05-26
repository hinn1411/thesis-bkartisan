import apiOrders from "@apis/apiOrders";
import { Message, SuccessIcon, options } from "@components/common/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";

export const useSaveOrder = () => {
  const [isOpenBuyLaterModal, setIsOpenBuyLaterModal] = useState(false);
  const navigate = useNavigate();
  const { mutate: saveOrder } = useMutation({
    mutationFn: apiOrders.saveOrder,
    onSuccess: () => {
      setIsOpenBuyLaterModal(false);
      toast(<Message>Thêm thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    },
  });
  return {
    saveOrder,
    isOpenBuyLaterModal,
    setIsOpenBuyLaterModal,
  };
};
