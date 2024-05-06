import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function useFormResponse<Type>(
  queryKey: string[],
  setOpenModal: Function,
  api: Fucntion
) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<Type>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      return api(...Object.values(values));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      toast.success("Thành công!");
      setOpenModal(false);
    },
    onError: () => {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại.");
    },
  });

  return {
    register,
    handleSubmit,
    mutate,
    isPending,
  };
}

export default useFormResponse;
