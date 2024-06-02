import {
  ErrorIcon,
  Message,
  SuccessIcon,
  options,
} from "@components/common/toast";
import { ToastOptions, toast } from "react-toastify";

export const useUINotification = () => {
  const notify = (msg: string) => {
    toast(<Message>{msg}!</Message>, {
      icon: <SuccessIcon />,
      ...(options as ToastOptions),
    });
  };
  const warn = (msg: string) => {
    toast(<Message>{msg}!</Message>, {
      icon: <ErrorIcon />,
      ...(options as ToastOptions),
    });
  };
  return { notify, warn };
};
