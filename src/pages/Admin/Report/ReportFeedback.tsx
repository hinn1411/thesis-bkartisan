import { FC, memo } from "react";
import { Box, Grid } from "@mui/material";
import { Button } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { formatDate } from "../../../utils/formatDate";

interface ReportFeedbackProps {
  report: any
}

const ReportFeedback: FC<ReportFeedbackProps> = memo(({report}) => {
  return (
    <>
      <hr style={{ borderWidth: "0.01rem" }} />
      <h1 className="text-3xl font-bold py-4">Report này đã được xử lí</h1>
      <Grid container p={1} rowGap={3} paddingBottom={2} >
        <Grid item xs={1.5} className="font-medium pb-2">Quản trị viên xử lí: </Grid>
        <Grid item xs={3} marginRight={"5rem"}>
          <TextField value={report.handlerName} />
        </Grid>
        <Grid item xs={1} className="font-medium pb-2">Ngày xử lí: </Grid>
        <Grid item xs={3.5}>
          <TextField value={formatDate("dd/mm/yyyy", new Date(report.handledAt))} />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={1.5} className="font-medium pb-2">Loại vi phạm: </Grid>
        <Grid item xs={10}>
          <TextField value={report.violation} />
        </Grid>
        <Grid item xs={2.5} className="font-medium pb-2">Miêu tả thêm và đề xuất: </Grid>
        <Grid item xs={9}>
          <TextField textarea value={report.response} minHeight="min-h-28" />
        </Grid>
      </Grid>
      {/* <Box display="flex" justifyContent="end" paddingX={8} paddingTop={2}>
        <Button color="failure">Xóa report này</Button>
      </Box> */}
    </>
  );
});

export default ReportFeedback;
