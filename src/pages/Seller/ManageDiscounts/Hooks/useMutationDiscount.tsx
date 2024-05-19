import {apiDiscount} from "@apis/apiDiscounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDiscount } from '@apis/apiDiscounts';


export const useCreateDiscount = () => {
    return useMutation({
      mutationFn: (Discount: any) => {
        return apiDiscount.createDiscount(Discount)
      }
    });
  };
  
  export const useDeleteDiscount = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (discountId: number) => {
        return apiDiscount.deleteDiscount(discountId)
  
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["alldiscounts"]});
      },
    });
  };

  export const useUpdateDiscount = () => {
  
    return useMutation({
      mutationFn: (discount: any) => {
        return apiDiscount.updateDiscount(discount)
  
      }
    });
  };