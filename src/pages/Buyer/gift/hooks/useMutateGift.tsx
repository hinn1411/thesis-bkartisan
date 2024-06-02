import apiCart from "@apis/apiCart";
import { useMutation } from "@tanstack/react-query";
import { useUINotification } from "./useUINotification";

export const useCreateGift = () => {
  const { notify, warn } = useUINotification();
  const { mutate: createGift } = useMutation({
    mutationFn: apiCart.addGift,
    onSuccess: () => notify("Thêm quà thành công!"),
    onError: (err) => warn(err.message),
  });
  return { createGift };
};


