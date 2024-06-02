import { useMutation } from "@tanstack/react-query";
import { useUINotification } from "../../gift/hooks/useUINotification";
import apiCart from "@apis/apiCart";
import { useState } from "react";

export const useDeleteGift = () => {
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
  const { notify, warn } = useUINotification();
  const { mutate: deleteGift } = useMutation({
    mutationFn: apiCart.deleteGift,
    onSuccess: () => {
      notify("Xóa thành công");
      setIsOpenedDeleteModal(false);
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onError: () => warn("Có lỗi xảy ra! Vui lòng thử lại"),
  });
  return {
    deleteGift,
    isOpenedDeleteModal,
    setIsOpenedDeleteModal,
  };
};
