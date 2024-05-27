import apiOrders from "@apis/apiOrders";
import { Message, SuccessIcon, options } from "@components/common/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ToastOptions, toast } from "react-toastify";

export const useChangeOrderState = () => {
  const [isChangeStateModalOpen, setIsChangeStateModalOpen] = useState(false);

  const { mutate: changeState } = useMutation({
    mutationFn: apiOrders.changeOrderState,
    onSuccess: () => {
      setIsChangeStateModalOpen(false);
      toast(<Message>Thay đổi thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    },
  });

  return {
    isChangeStateModalOpen,
    setIsChangeStateModalOpen,
    changeState,
  };
};
