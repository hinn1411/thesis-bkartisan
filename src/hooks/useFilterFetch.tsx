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

  const [page, setPage] = useState(queryKey[1]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<Type>({
    defaultValues: options,
  });

  const [filterOpts, setFilterOpts] = useState(options);

  const { data, isPending, error } = useQuery({
    queryKey: [queryKey[0], page, filterOpts],
    queryFn: async () => {
      return await api(page, 10, filterOpts);
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
    getValues,
    page,
    setPage,
    formErrors: errors,
  };
}

export default useFilterFetch;
