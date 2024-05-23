import { FC, Fragment, memo, useState } from "react";
import { Grid } from "@mui/material";
import ListItem from "../../../components/admin/ListItem";
import apiUsers from "../../../apis/apiUsers";
import Pagination from "../../../components/common/pagination/Pagination";
import { Select, TextInput, Button } from "flowbite-react";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import { checkLockStatus } from "../../../utils/checkLockStatus";
import useFilterFetch from "../../../hooks/useFilterFetch";
import apiReports from "@apis/apiReports";
import apiOrders from "@apis/apiOrders";

type FormData = {
  byDate: "newToOld" | "oldToNew";
  byStatus: "all" | "normal" | "lock";
  name: string;
};

const OrderManagement: FC = memo(() => {
  const filterName = "usermanagement-filter";
  const defaultFieldValues = { byDate: "newToOld", byStatus: "all", name: "" };
  const queryKey = ["users", 1];

  const { register, data, isPending, onSubmit, error, page, setPage } =
    useFilterFetch<FormData>(
      filterName,
      defaultFieldValues,
      queryKey,
      apiOrders.getOrdersList
    );

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách đơn hàng</h1>
      <Grid container gap={4} py={3}>
        <Grid item xs={0.8}>
          <div className="text-base">Thời gian tạo:</div>
        </Grid>
        <Grid item xs={2}>
          <Select id="byDate" {...register("byDate")}>
            <option value={"newToOld"}>Mới nhất</option>
            <option value={"oldToNew"}>Sớm nhất</option>
          </Select>
        </Grid>
        <Grid item xs={1}>
          <div className="text-base">Tình trạng:</div>
        </Grid>

        <Grid item xs={2}>
          <Select id="byStatus" {...register("byStatus")}>
            <option value={"all"}>Toàn bộ</option>
            <option value={"normal"}>Bình thường</option>
            <option value={"lock"}>Tạm khóa</option>
          </Select>
        </Grid>

        <Grid item xs={2.5}>
          <TextInput
            type="text"
            placeholder="Nhập mã đơn hàng"
            {...register("name")}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            color="blue"
            fullSized={true}
            onClick={onSubmit}
            disabled={isPending}
          >
            Lọc
          </Button>
        </Grid>
      </Grid>
      <hr style={{ borderWidth: "0.01rem" }} />

      {/**Order */}

      <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
        <Grid item xs={2} className="text-center">
          Mã đơn hàng
        </Grid>
        <Grid item xs={2.5}>
          Người bị report
        </Grid>
        <Grid item xs={2.5}>
          Người gửi
        </Grid>
        <Grid item xs={2}>
          Trạng thái
        </Grid>
        <Grid item xs={2}>
          Thời gian tạo
        </Grid>
      </Grid>
      <hr className="border" />

      {isPending ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage msg={error.response.data.msg} />
      ) : data.length === 0 ? (
        <ErrorMessage msg={"Không tìm thấy kết quả trùng khớp"} />
      ) : (
        data.map((element: any, index: number) => {
          return <ListItem key={index} type="order" values={element} />;
        })
      )}

      <Pagination currentPage={page} goToPage={setPage} />
    </Fragment>
  );
});

export default OrderManagement;
