import { FC, memo } from "react";
import { Box, Grid, Avatar } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiOrders from "@apis/apiOrders";
import ErrorMessage from "@components/admin/ErrorMessage";
import LoadingMessage from "@components/admin/LoadingMessage";
import { formatDate } from "@utils/formatDate";

const OrderDetail: FC = memo(() => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      return apiOrders.getOrderAdminDetail(id);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin đơn hàng</h1>
        <ReturnIcon />
      </Box>
      {isPending ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage msg={error.message} />
      ) : (
        <>
          <Grid container p={1} columnGap={9} rowGap={2} paddingBottom={2}>
            <Grid item xs={3.5}>
              <Box className="font-medium pb-2">Mã đơn hàng</Box>
              <TextField value={data.orderId} />
            </Grid>
            <Grid item xs={3.5}>
              <Box className="font-medium pb-2">Người mua</Box>
              <TextField value={data.buyerName} />
            </Grid>
            <Grid item xs={3.5}>
              <Box className="font-medium pb-2">Người bán</Box>
              <TextField value={data.sellerName} />
            </Grid>
            <Grid item xs={3.5}>
              <Box className="font-medium pb-2">Ngày tạo</Box>
              <TextField
                value={formatDate("dd/mm/yyyy", new Date(data.createAt))}
              />
            </Grid>
            <Grid item xs={3.5}>
              <Box className="font-medium pb-2">Trạng thái</Box>
              <TextField value={data.status} />
            </Grid>
            <Grid item xs={3.5}>
              <Box className="font-medium pb-2">Phương thức thanh toán</Box>
              <TextField value={data.paymentMethod} />
            </Grid>
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Địa chỉ giao hàng</Box>
              <TextField
                textarea
                value={data.nation + ", " + data.address}
                minHeight="min-h-28"
              />
            </Grid>
          </Grid>
          <hr style={{ borderWidth: "0.01rem" }} />
          <Box paddingBottom={3}>
            <h1 className="text-3xl font-bold py-3">
              Các sản phẩm trong đơn hàng
            </h1>
            <Grid
              container
              className={"text-slate-600 text-lg font-medium p-2 py-5"}
            >
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                Tên sản phẩm
              </Grid>
              <Grid item xs={3}>
                Số lượng
              </Grid>
              <Grid item xs={3}>
                Đơn giá
              </Grid>
            </Grid>
            <Grid
              container
              className={"text-slate-600 text-lg font-medium p-2 py-5"}
              rowSpacing={3}
            >
              {data.orderProduct.map((product) => (
                <>
                  <Grid item xs={1}>
                    <Avatar
                      src={
                        product.coverImage
                      }
                      sx={{ width: "3.5rem", height: "3.5rem" }}
                    />
                  </Grid>
                  <Grid item xs={4} className="truncate pr-4">
                    {product.name}
                  </Grid>
                  <Grid item xs={3}>
                    {product.quantity}
                  </Grid>
                  <Grid item xs={3}>
                    {`${product.price}đ`}
                  </Grid>
                  <Grid item xs={1}>
                    <Button color="gray" size={"md"}>
                      Xem
                    </Button>
                  </Grid>
                </>
              ))}
            </Grid>
            <Box display={"flex"} justifyContent="flex-end" marginTop={3}>
              <h1 className="text-2xl font-medium">{`Tổng giá tiền: ${data.totalPrice}đ.`}</h1>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
});

export default OrderDetail;
