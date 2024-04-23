import { useMutation, useQueryClient  } from '@tanstack/react-query';
// import { axiosClient } from '../../../../apis/axiosClient';
import apiProducts from '../../../../apis/apiProducts';

// export interface ProductProps {
//   name: string,
//   images: File[],
//   video: File | null,
//   price: number,
//   quantity: number,
//   material: string,
//   category: string,
//   chooseOption1: string[],
//   chooseOption2: string[],
//   description: string,
// }

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (newProduct: FormData) => {
      return apiProducts.createProduct(newProduct)
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productIds: number[]) => {
      return apiProducts.deleteProduct(productIds)

    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["products"]});
    },
  });
};
