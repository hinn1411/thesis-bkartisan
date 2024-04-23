import { useMutation } from '@tanstack/react-query';
import apiAuth from '../../../apis/apiAuth';

export const useRegister = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: apiAuth.register,
  });
  return {
    register: mutate,
    isPending,
    isSuccess,
    isError,
    errorMessage: error?.message,
  };
};
