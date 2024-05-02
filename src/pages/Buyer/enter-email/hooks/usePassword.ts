import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiAuth from '@apis/apiAuth';
export const usePassword = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: apiAuth.restorePassword,
    onSuccess: () => {
      navigate('/send_password');
    },
  });

  return {
    restorePassword: mutate,
    isPending,
    isError,
    errorMessage: error?.message,
  };
};
