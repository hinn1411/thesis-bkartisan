import { useQuery } from '@tanstack/react-query';
import apiOptions from '../../../../apis/apiOptions';
import apiCategorys from '../../../../apis/apiCategory';




export const useOptions = () => {
    const { data, isFetching, isSuccess, error } = useQuery({
        queryKey: ['options'],
        queryFn: async () => {
          return await apiOptions.getOptions();
        },
      });
      return {
        data,
        isFetching,
        isSuccess,
        error,
      };
};

export const useChooseOptions1 = (optionTerm: number) => {
  const { data, refetch, isFetching, isSuccess, error } = useQuery({
      queryKey: ['childOptions1', optionTerm],
      queryFn: async () => {
        return await apiOptions.getChildOptions(optionTerm)
      },

    });
    return {
      refetch,
      data,
      isFetching,
      isSuccess,
      error,
    };
};

export const useChooseOptions2 = (optionTerm: number) => {
  const { data, refetch, isFetching, isSuccess, error } = useQuery({
      queryKey: ['childOptions2', optionTerm],
      queryFn: async () => {
        return await apiOptions.getChildOptions(optionTerm)
      },

    });
    return {
      refetch,
      data,
      isFetching,
      isSuccess,
      error,
    };
};

export const useProductCategorys = () => {
  const { data, isFetching, isSuccess, error } = useQuery({
      queryKey: ['categorys'],
      queryFn: async () => {
        return await apiCategorys.getCategorys();
      },
    });
    return {
      data,
      isFetching,
      isSuccess,
      error,
    };
};
