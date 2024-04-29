import { FC, Fragment, memo } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select, Rating } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { Avatar } from "@mui/material";
import ReportFeedback from "./ReportFeedback";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const CommentReport: FC = memo(() => {
  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin report bình luận</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={2} paddingBottom={2}>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người bị report</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người gửi</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Thời gian gửi</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Lí do vi phạm</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Thông tin thêm từ người report</Box>
          <TextField textarea value="Lầu Hội" minHeight="min-h-28" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">
            Vi phạm tại phần bình luận sản phẩm
          </Box>
          <TextField value="Đồng hồ" />
        </Grid>
        <Grid item xs={2.5} paddingTop={4}>
          <Button fullSized className="h-9">
            Xem chi tiết sản phẩm
          </Button>
        </Grid>
      </Grid>

      <hr style={{ borderWidth: "0.01rem" }} />
      <Box className="flex flex-col space-y-4" paddingBottom={3}>
        <h1 className="text-3xl font-bold py-3">Thông tin bình luận</h1>
        <Rating>
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
        </Rating>
        <p>
          Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque
          justo eget volutpat nisl cursus quis pretium.Lorem ipsum dolor sit
          amet consectetur. Odio integer pellentesque justo eget volutpat nisl
          cursus quis pretium.Lorem ipsum dolor sit amet consectetur. Odio
          integer pellentesque justo eget volutpat nisl cursus quis
          pretium.Lorem ipsum dolor sit amet consectetur. Odio integer
          pellentesque justo eget volutpat nisl cursus quis pretium.
        </p>
        <Box className="flex items-center space-x-2.5">
          <Avatar src={img_example} sx={{ width: "3rem", height: "3rem" }} />
          <Box className="font-bold">Lầu Hội</Box>
          <Box className="font-thin">25 Tháng 10, 2023</Box>
        </Box>
      </Box>
      <ReportFeedback />
    </Box>
  );
});

export default CommentReport;
