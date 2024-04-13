import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

function useFilterFetch<Type>(
  filterName: string,
  defaultValues: Type,
  queryKey: any,
  api: Function
) {
  const options =
    JSON.parse(sessionStorage.getItem(filterName) || "null") || defaultValues;

  const { register, handleSubmit } = useForm<Type>({
    defaultValues: options,
  });

  const [filterOpts, setFilterOpts] = useState(options);

  const { data, isPending, error } = useQuery({
    queryKey: [queryKey[0], queryKey[1], filterOpts],
    queryFn: async () => {
        console.log(queryKey);
      return await api(queryKey[1], 20, filterOpts);
    },
    refetchOnWindowFocus: false,
  });

  const onSubmit = (data: Type) => {
    sessionStorage.setItem(filterName, JSON.stringify(data));
    setFilterOpts(data);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    isPending,
    data,
    error,
  };
}

export default useFilterFetch;
