import apiOrders from "@apis/apiOrders";
import { Message, SuccessIcon, options } from "@components/common/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastOptions, toast } from "react-toastify";

export const useChangeOrderState = () => {
  const queryClient = useQueryClient()

  const { mutate: changeState, isPending, isSuccess } = useMutation({
    mutationFn: apiOrders.changeOrderState,
    onSuccess: () => {
      toast(<Message>Thay đổi thành công</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setTimeout(() => {
      }, 500);
      queryClient.invalidateQueries({queryKey: ["sellerOrderDetail"]});
    },
  });

  return {
    changeState,
    isPending,
    isSuccess,
  };
};
