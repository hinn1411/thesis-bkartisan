import { FC, Fragment, memo } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { BsChatLeftDots } from "react-icons/bs";

const OrderReport: FC = memo(() => {

  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin report mua bán</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={3} paddingBottom={2}>
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
        <Grid item xs={6} display="flex" justifyContent="space-between">
          <Button color="light"><BsChatLeftDots className="mr-2 h-5 w-5"/> Nhắn tin với người bị report</Button>
          <Button color="light"><BsChatLeftDots className="mr-2 h-5 w-5"/> Nhắn tin với người gửi report</Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} className="font-medium pb-2">Hình ảnh video đi kèm: </Grid>
      </Grid>
    </Box>
  );
});

export default OrderReport;
