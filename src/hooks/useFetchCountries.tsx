import apiAddress from "@apis/apiAdress";
import { useQuery } from "@tanstack/react-query";

export const useFetchCountries = () => {
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: apiAddress.getCountries,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { countries };
};
