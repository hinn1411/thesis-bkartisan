import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
import apiProducts from '@apis/apiProducts';
export const useProductDetail = (id: string) => {
  // const { productId } = useParams();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['product', { id: id }],
    queryFn: async () => {
      return await apiProducts.getProductDetails(id);
    },
    refetchOnWindowFocus: false
  });

  return {
    data,
    isFetching,
    isError,
  };
};
