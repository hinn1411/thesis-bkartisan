import apiTransports from "@apis/apiTransport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITransport } from '@apis/apiTransport';


export const useCreateTransport = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (transport: ITransport) => {
        return apiTransports.createTransport(transport)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["transports"]});
      },
    });
  };
  
  export const useDeleteTransport = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (transportId: number) => {
        return apiTransports.deleteTransport(transportId)
  
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["transports"]});
      },
    });
  };

  export const useUpdateTransports = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (transports: ITransport[]) => {
        return apiTransports.updateTransports(transports)
  
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["transports"]});
      },
    });
  };