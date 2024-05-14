import apiComment from '@apis/apiComment';
import { ErrorIcon, Message, options } from '@components/common/toast';
import { useMutation } from '@tanstack/react-query';
import { ToastOptions, toast } from 'react-toastify';

export const useComment = () => {
  const { mutate: addComment } = useMutation({
    mutationFn: apiComment.createComment,
    onError: () => {
      toast(<Message>Có lỗi xảy ra, vui lòng thử lại</Message>, {
        icon: <ErrorIcon />,
        ...(options as ToastOptions),
      });
    },
  });

  return { addComment };
};
