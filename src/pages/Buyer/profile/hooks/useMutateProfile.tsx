import apiUsers from "@apis/apiUsers";
import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from "@components/common/toast";
import { useMutation } from "@tanstack/react-query";
import { ToastOptions, toast } from "react-toastify";

export const useMutateProfile = () => {
  const { mutate: updateAccount } = useMutation({
    mutationFn: async (accountData: FormData) =>
      await apiUsers.updateAccount(accountData),
    onSuccess: () => {
      toast(<Message>Cập nhật thành công!</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
    },
    onError: () => {
      toast(<Message>Có lỗi xảy ra, vui lòng thử lại</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });
  const { mutate: updatePassword } = useMutation({
    mutationFn: async (passwordData: {
      password: string;
      newPassword: string;
    }) => await apiUsers.updatePassword(passwordData),
    onSuccess: () => {
      toast(<Message>Cập nhật mật khẩu thành công!</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
    },
    onError: (err: Error) => {
      console.log(err);

      toast(<Message>{err.message}</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });

  const { mutate: updateEmail } = useMutation({
    mutationFn: async (passwordData: { password: string; email: string }) =>
      await apiUsers.updateEmail(passwordData),
    onSuccess: () => {
      toast(<Message>Cập nhật email thành công!</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
    },
    onError: (err: Error) => {
      console.log(err);

      toast(<Message>{err.message}</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });

  const { mutate: updateAddress } = useMutation({
    mutationFn: async (addressData: { nation: string; address: string }) =>
      await apiUsers.updateAddress(addressData),
    onSuccess: () => {
      toast(<Message>Cập nhật địa chỉ thành công!</Message>, {
        icon: <SuccessIcon />,
        ...(options as ToastOptions),
      });
    },
    onError: (err: Error) => {
      console.log(err);

      toast(<Message>{err.message}</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });
  return { updateAccount, updatePassword, updateEmail, updateAddress };
};
