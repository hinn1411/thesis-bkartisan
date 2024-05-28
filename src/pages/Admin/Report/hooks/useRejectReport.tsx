import apiReports from "@apis/apiReports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRejectReport = (reportId) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      return apiReports.handleReport(...Object.values(values));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reportDetails", reportId.toString()],
      });
      toast.success("Thành công!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại.");
    },
  });

  return {
    mutate,
    isPending,
  }
};
