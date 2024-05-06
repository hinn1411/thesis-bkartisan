import { FC, memo } from "react";
import CommentReport from "./CommentReport";
import OrderReport from "./OrderReport";
import ProductReport from "./ProductReport";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiReports from "../../../apis/apiReports";
import { Box } from "@mui/system";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";

const ReportDetail: FC = memo(() => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["reportDetails", id],
    queryFn: async () => {
      return await apiReports.getReportDetails(id);
    },
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return (
      <Box paddingBottom={4}>
        <Box display={"flex"} justifyContent="space-between">
          <h1 className="text-3xl font-bold py-3">Thông tin report</h1>
          <ReturnIcon />
        </Box>
        {isPending ? <LoadingMessage /> : <ErrorMessage msg={error.message}/>}
      </Box>
    );
  }

  return data.type === "Bình luận" ? (
    <CommentReport report={data}/>
  ) : data.type === "Sản phẩm" ? (
    <ProductReport report={data}/>
  ) : (
    <OrderReport report={data}/>
  );
});

export default ReportDetail;
