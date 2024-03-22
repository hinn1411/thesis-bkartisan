import { FC, Fragment, memo } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select } from "flowbite-react";

const ReportDetail: FC = memo(() => {
  const type = "comment";

  return (
    <Fragment>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">
          Thông tin report {type === "comment" ? "bình luận" : "sản phẩm"}
        </h1>
        <ReturnIcon />
      </Box>
    </Fragment>
  );
});

export default ReportDetail;
