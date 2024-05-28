import apiCategorys from "@apis/apiCategory";
import { useQuery } from "@tanstack/react-query";

export const useCategoryChildren = (id: number) => {
  const { data, isFetching } = useQuery({
    queryKey: ["category_children", id],
    queryFn: () => apiCategorys.getCategoryChildren(id),
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isFetching,
  };
};
