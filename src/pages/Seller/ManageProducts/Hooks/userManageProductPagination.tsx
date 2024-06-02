import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiProducts from "../../../../apis/apiProducts";

export interface usePaginationProps {}

// eslint-disable-next-line react-refresh/only-export-components
const PAGE = 1;
// eslint-disable-next-line react-refresh/only-export-components
const OFFSET = 6;

export const useManageProductPagination = (
  searchTerm: string,
  status: string,
  isSoldOut: boolean | null
) => {
  const [page, setPage] = useState(PAGE);
  const { data, isFetching, isSuccess, error, refetch } = useQuery({
    queryKey: ["productsOfSeller", page, searchTerm],
    queryFn: async () => {
      return await apiProducts.getProductsOfSeller(
        searchTerm,
        page,
        OFFSET,
        status,
        isSoldOut
      );
    },
    refetchOnWindowFocus: false,
  });

  return {
    page,
    setPage,
    data,
    isFetching,
    isSuccess,
    error,
    refetch,
  };
};
