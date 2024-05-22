import { FC, Fragment, memo } from "react";
import { Box, Grid, Avatar } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select } from "flowbite-react";
import TextField from "../../../components/admin/TextField";

const OrderDetail: FC = memo(() => {
  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin đơn hàng</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={2} paddingBottom={2}>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Mã đơn hàng</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người mua</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người bán</Box>
          <TextField value="Lầu Hội" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Ngày tạo</Box>
          <TextField value="20/5/2024" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Trạng thái</Box>
          <TextField value="Chờ xác nhận" />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Phương thức thanh toán</Box>
          <TextField value="Momo" />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Địa chỉ giao hàng</Box>
          <TextField textarea value="KTX khu A, ĐHQG" minHeight="min-h-28" />
        </Grid>
      </Grid>
      <hr style={{ borderWidth: "0.01rem" }} />
      <Box paddingBottom={3}>
        <h1 className="text-3xl font-bold py-3">Các sản phẩm trong đơn hàng</h1>
        <Grid
          container
          className={"text-slate-600 text-lg font-medium p-2 py-5"}
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            Tên sản phẩm
          </Grid>
          <Grid item xs={3}>
            Phân loại hàng
          </Grid>
          <Grid item xs={2}>
            Số lượng
          </Grid>
          <Grid item xs={2}>
            Đơn giá
          </Grid>
        </Grid>
        <Grid
          container
          className={"text-slate-600 text-lg font-medium p-2 py-5"}
        >
          <Grid item xs={1}>
            <Avatar
              src={
                "https://res.cloudinary.com/dpurshaxm/image/upload/v1710779299/bk_artisan/tmp-1-1710779296879_w6xq4q.jpg"
              }
              sx={{ width: "3.5rem", height: "3.5rem" }}
            />
          </Grid>
          <Grid item xs={3}>
            Dây chuyền
          </Grid>
          <Grid item xs={3}>
            Size M
          </Grid>
          <Grid item xs={2}>
            2
          </Grid>
          <Grid item xs={2}>
            100.000đ
          </Grid>
          <Grid item xs={1}>
            <Button color="gray" size={"md"}>
              Xem
            </Button>
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent="flex-end" marginTop={3}>
          <h1 className="text-2xl font-medium">Tổng giá tiền: 200.000đ</h1>
        </Box>
      </Box>
    </Box>
  );
});

export default OrderDetail;
