import apiOrders from "@apis/apiOrders";
import { Message, SuccessIcon, options } from "@components/common/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";

export const useCancelOrder = () => {
  const [isOpenCancelOrderModal, setIsOpenCancelOrderModal] = useState(false);
  // const navigate = useNavigate();
  const { mutate: cancelOrder } = useMutation({
    mutationFn: apiOrders.cancelOrder,
    onSuccess: () => {
      setIsOpenCancelOrderModal(false);
      toast(<Message>Hủy đơn thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    },
  });
  return {
    cancelOrder,
    isOpenCancelOrderModal,
    setIsOpenCancelOrderModal,
  };
};
