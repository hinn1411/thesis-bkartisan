import { FC, memo } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { Button } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { Avatar } from "@mui/material";
import ReportFeedback from "./ReportFeedback";
import { formatDate } from "../../../utils/formatDate";
import { Rating } from '@mui/material';

interface CommentReportProps {
  report: any;
}

const CommentReport: FC<CommentReportProps> = memo(({ report }) => {
  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin report bình luận</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={2} paddingBottom={2}>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người bị report</Box>
          <TextField value={report.reportedUserName} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người gửi</Box>
          <TextField value={report.reporterName} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Thời gian gửi</Box>
          <TextField
            value={formatDate("hh:MM dd/mm/yyyy", new Date(report.createdAt))}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Lí do vi phạm</Box>
          <TextField value={report.reason} />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Thông tin thêm từ người report</Box>
          <TextField
            textarea
            value={report.additionalInfo}
            minHeight="min-h-28"
          />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">
            Người xử lý report
          </Box>
          <TextField value={report.handler} />
        </Grid>
      </Grid>

      <hr style={{ borderWidth: "0.01rem" }} />
      <Box className="flex flex-col space-y-4" paddingBottom={3}>
        <h1 className="text-3xl font-bold py-3">Thông tin bình luận</h1>

        <Rating name="read-only" value={report.numberOfStars} readOnly />
        <p>
          {report.content}
        </p>
        <Box className="flex items-center space-x-2.5">
          <Avatar src={report.writerAvatar} sx={{ width: "3rem", height: "3rem" }} />
          <Box className="font-bold">{report.reportedUserName}</Box>
          <Box className="font-thin">{formatDate("hh:MM dd/mm/yyyy", new Date(report.commentCreatedAt))}</Box>
        </Box>
      </Box>
      {report.status == "Đã xử lý" ? (
        <ReportFeedback report={report} />
      ) : (
        <Grid container columnGap={1}>
          <Grid item xs={2}>
            <Button fullSized className="h-9 justify-self-start">
              Xem chi tiết sản phẩm
            </Button>
          </Grid>
          <Grid item xs={6.5} />
          <Grid item xs={1.5}>
            <Button fullSized color="gray" className="h-9 justify-self-end">
              Hủy yêu cầu
            </Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button fullSized color="failure" className="h-9 justify-self-end">
              Xóa bình luận
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
});

export default CommentReport;
