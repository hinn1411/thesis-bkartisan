import apiUsers from "@apis/apiUsers";
import { useQuery } from "@tanstack/react-query";

export const useFetchShopInformation = (seller: string) => {
  const { data: shop, isLoading } = useQuery({
    queryKey: ["shop", seller],
    queryFn: async () => await apiUsers.getShopInformation(seller),
  });
  return { shop, isLoading };
};

export default useFetchShopInformation;
