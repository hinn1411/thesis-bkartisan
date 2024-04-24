import apiAuth from '../../../apis/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
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
