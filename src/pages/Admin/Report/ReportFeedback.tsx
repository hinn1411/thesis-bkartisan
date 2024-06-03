import { FC, memo } from "react";
import { Box, Grid } from "@mui/material";
import { Button } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { formatDate } from "../../../utils/formatDate";

interface ReportFeedbackProps {
  report: any;
  isOrderReport: boolean;
}

const ReportFeedback: FC<ReportFeedbackProps> = memo(
  ({ report, isOrderReport = false }) => {
    let rejectMsg;
    if (report.type !== "Mua bán") {
      rejectMsg = `Report này đã được đóng lại và quản trị viên vẫn cho phép ${
        report.type === "Bình luận" ? "bài bình luận" : "sản phẩm"
      } hiện lên và không xóa ${
        report.type === "Bình luận" ? "bình luận" : "sản phẩm"
      }.`;
    } else {
      rejectMsg =
        "Report này được được đóng lại và bạn từ chối yêu cầu của người report.";
    }

    return (
      <>
        <hr style={{ borderWidth: "0.01rem" }} />
        <h1 className="text-3xl font-bold py-4">Report này đã được xử lí</h1>
        <Grid container p={1} rowGap={3} paddingBottom={2}>
          <Grid item xs={1.5} className="font-medium pb-2">
            Quản trị viên xử lí:{" "}
          </Grid>
          <Grid item xs={3} marginRight={"5rem"}>
            <TextField value={report.handlerName} />
          </Grid>
          <Grid item xs={1} className="font-medium pb-2">
            Ngày xử lí:{" "}
          </Grid>
          <Grid item xs={3.5}>
            <TextField
              value={formatDate("dd/mm/yyyy", new Date(report.handledAt))}
            />
          </Grid>
          <Grid item xs={2} />
          {report.violation ? (
            <>
              <Grid item xs={1.5} className="font-medium pb-2">
                {isOrderReport ? "Lí do: " : "Loại vi phạm: "}
              </Grid>
              <Grid item xs={10}>
                <TextField value={report.violation} />
              </Grid>
              <Grid item xs={2.5} className="font-medium pb-2">
                {isOrderReport ? "Ghi chú: " : "Miêu tả thêm và đề xuất: "}
              </Grid>
              <Grid item xs={9}>
                <TextField
                  textarea
                  value={report.response}
                  minHeight="min-h-28"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={10}>
                <TextField value={rejectMsg} />
              </Grid>
            </>
          )}
        </Grid>
        {/* <Box display="flex" justifyContent="end" paddingX={8} paddingTop={2}>
        <Button color="failure">Xóa report này</Button>
      </Box> */}
      </>
    );
  }
);

export default ReportFeedback;
