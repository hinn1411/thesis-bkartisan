import apiTransports from "@apis/apiTransport";
import { useQuery } from "@tanstack/react-query";


export const useQueryTransports = () => {
    const { data, isFetching, isSuccess, error } = useQuery({
        queryKey: ['transports'],
        queryFn: async () => {
          return await apiTransports.getTransports();
        },
      });
      return {
        data,
        isFetching,
        isSuccess,
        error,
      };
};