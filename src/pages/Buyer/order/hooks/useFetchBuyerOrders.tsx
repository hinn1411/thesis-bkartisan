import apiOrders from "@apis/apiOrders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useFetchBuyerOrders = () => {
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const { data, isFetching } = useQuery({
    queryKey: ["buyer_orders", currentStatus],
    queryFn: async () => {
      return await apiOrders.getBuyerOrders(currentStatus);
    },
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isLoading: isFetching,
    currentStatus,
    setCurrentStatus,
  };
};
