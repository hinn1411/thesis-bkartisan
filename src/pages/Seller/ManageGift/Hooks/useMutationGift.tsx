import {apiGifts, IGift} from "@apis/apiGift";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateGift = () => {
    return useMutation({
      mutationFn: (Gift: FormData) => {
        return apiGifts.createGift(Gift)
      }
    });
  };
  
  export const useDeleteGift = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (GiftId: number[]) => {
        return apiGifts.deleteGift(GiftId)
  
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["allGifts"]});
      },
    });
  };

  export const useUpdateGift = () => {
  
    return useMutation({
      mutationFn: (Gift: IGift) => {
        return apiGifts.updateGift(Gift)
  
      }
    });
  };