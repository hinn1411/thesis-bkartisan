import { useMutation } from '@tanstack/react-query';
import apiAuth from '../../../apis/apiAuth';
import { useNavigate } from 'react-router-dom';
export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await apiAuth.login(userData);
      console.log(`user login info = `, data);
      return data;
    },
    onSuccess: () => {
      navigate('/');
    },
  });
  return {
    login: mutate,
    isSuccess,
    isPending,
    isError,
    errorMessage: error?.message,
  };
};
