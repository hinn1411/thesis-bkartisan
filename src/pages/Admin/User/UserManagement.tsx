import { FC, Fragment, memo } from "react";
import { Grid } from "@mui/material";
import ListItem from "../../../components/admin/ListItem";
import apiUsers from "../../../apis/apiUsers";
import Pagination from "../../../components/common/pagination/Pagination";
import { Select, TextInput, Button } from "flowbite-react";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import { checkLockStatus } from "../../../utils/checkLockStatus";
import useFilterFetch from "../../../hooks/useFilterFetch";

type FormData = {
  byDate: "newToOld" | "oldToNew";
  byStatus: "all" | "normal" | "lock";
  name: string;
};

const UserManagement: FC = memo(() => {
  const filterName = "usermanagement-filter";
  const defaultFieldValues = { byDate: "newToOld", byStatus: "all", name: "" };
  const queryKey = ["users", 1];

  const { register, data, isPending, onSubmit, error, page, setPage } = useFilterFetch<FormData>(
    filterName,
    defaultFieldValues,
    queryKey,
    apiUsers.getUsersList
  );

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách người dùng</h1>
      <Grid container gap={4} py={3}>
        <Grid item xs={0.8}>
          <div className="text-base">Ngày tạo:</div>
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
            placeholder="Nhập tên người dùng"
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

      {/**User */}

      <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          Tên
        </Grid>
        <Grid item xs={2}>
          Giới tính
        </Grid>
        <Grid item xs={2}>
          SĐT
        </Grid>
        <Grid item xs={2}>
          Email
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
          if (checkLockStatus(element[element.length - 2])) {
            return (
              <ListItem
                key={index}
                type="user"
                values={element}
                className="bg-[#F2F6FC] hover:bg-[#F2F6FC] text-red-500"
              />
            );
          }
          return <ListItem key={index} type="user" values={element} />;
        })
      )}

      <Pagination currentPage={page} goToPage={setPage} />

      {/**Order */}

      {/* <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
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
          Thời gian gửi
        </Grid>
      </Grid>
      <hr className="border" />

      {arr.map((element, index) => {
        return <ListItem key={index} type="order" values={element} />;
      })} */}

      {/**Handled report */}

      {/* <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
        <Grid item xs={1.5}>
          Loại
        </Grid>
        <Grid item xs={3}>
          Người bị report
        </Grid>
        <Grid item xs={3}>
          Người gửi
        </Grid>
        <Grid item xs={2.5}>
          Thời gian gửi
        </Grid>
      </Grid>
      <hr className="border" />

      {arr.map((element, index) => {
        return <ListItem key={index} type="handled-report" values={element}/>;
      })} */}
    </Fragment>
  );
});

export default UserManagement;
