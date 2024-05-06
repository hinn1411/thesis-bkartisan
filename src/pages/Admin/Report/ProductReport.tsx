import { FC, Fragment, memo } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { formatDate } from "../../../utils/formatDate";

interface ProductReportProps {
  report: any
}

const ProductReport: FC<ProductReportProps> = memo(({report}) => {
  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin report sản phẩm</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={2} paddingBottom={2}>
      <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người bị report</Box>
          <TextField value={report.reportedUser} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người gửi</Box>
          <TextField value={report.reporter} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Thời gian gửi</Box>
          <TextField value={formatDate("hh:MM dd/mm/yyyy", new Date(report.createdAt))} />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Lí do vi phạm</Box>
          <TextField value={report.reason} />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Thông tin thêm từ người report</Box>
          <TextField textarea value={report.additionalInfo} minHeight="min-h-28" />
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductReport;
