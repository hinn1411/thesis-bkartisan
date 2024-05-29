import apiOrders from "@apis/apiOrders";
import { Message, SuccessIcon, options } from "@components/common/toast";
import { useMutation } from "@tanstack/react-query";
import { ToastOptions, toast } from "react-toastify";

export const useChangeOrderState = () => {

  const { mutate: changeState, isPending, isSuccess } = useMutation({
    mutationFn: apiOrders.changeOrderState,
    onSuccess: () => {
      toast(<Message>Thay đổi thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setTimeout(() => {
      }, 500);
    },
  });

  return {
    changeState,
    isPending,
    isSuccess,
  };
};
