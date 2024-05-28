import apiEmail from "@apis/apiEmail";
import apiUsers from "@apis/apiUsers";
import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from "@components/common/toast";
import { useUserProfile } from "@hooks/useUserProfile";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";

export const useSellerCode = () => {
  const navigate = useNavigate();
  const { user } = useUserProfile();
  const { mutate: createSellerCode } = useMutation({
    mutationFn: apiEmail.sendSellerCode,
  });

  const { mutate: becomeSeller } = useMutation({
    mutationFn: apiUsers.becomeSeller,
    onSuccess: () => {
      toast(<Message>Xác thực thành công!</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
      setTimeout(() => {
        navigate(`/shop/${user.username}`);
      }, 1500);
    },
    onError: (err: Error) => {
      console.log(err);

      toast(<Message>{err.message}</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });
  return {
    createSellerCode,
    becomeSeller,
  };
};
