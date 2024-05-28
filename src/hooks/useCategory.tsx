import { useQuery } from "@tanstack/react-query";
import { LEVELS } from "../constants/categories";
import apiCategorys from "../apis/apiCategory";
export const useCategory = () => {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiCategorys.getCategoryByLevel(LEVELS.GRANDPARENT),
    refetchOnWindowFocus: false,
  });
  return {
    categories: data,
    isPending,
  };
};
