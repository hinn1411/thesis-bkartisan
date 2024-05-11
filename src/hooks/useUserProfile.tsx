import { useQuery } from '@tanstack/react-query';
import apiUsers from '../apis/apiUsers';
export const useUserProfile = () => {
  const { data: user, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: apiUsers.getProfile,
    refetchOnWindowFocus: false,
    retry: false
  });

  return {
    user,
    isAuthenticated: !!user,
    isPending,
    error
  };
};
