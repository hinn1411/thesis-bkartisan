import { useMutation } from '@tanstack/react-query';
import apiAuth from '@apis/apiAuth';
import { useNavigate } from 'react-router-dom';
import { USERS } from '@contants/users';
export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData) => {
      const { data } = await apiAuth.login(userData);
      // console.log(`user login info = `, data);
      return data;
    },
    onSuccess: (userInfo) => {
      const { role } = userInfo.data;
      console.log(userInfo);
      if (role === USERS.ADMIN) {
        return navigate('/admin');
      }
      if (role === USERS.SELLER) {
        return navigate('/seller');
      }
      return navigate('/');
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
