import { FC, Fragment, memo } from "react";
import { Grid } from "@mui/material";
import ListItem from "../../../components/admin/ListItem";
import apiReports from "../../../apis/apiReports";
import Pagination from "../../../components/common/pagination/Pagination";
import { Select, TextInput, Button } from "flowbite-react";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import useFilterFetch from "../../../hooks/useFilterFetch";
import { useLocation, useOutletContext } from "react-router-dom";

type FormData = {
  byDate: "newToOld" | "oldToNew";
  byStatus: "Toàn bộ" | "Chưa xem" | "Chưa xử lý" | "Đã xử lý";
  byType: "Toàn bộ" | "Bình luận" | "Sản phẩm" | "Mua bán";
  searchTerm: string;
  mode: "Của bản thân" | "Của các cộng tác viên khác";
  collab: string;
};

const ReportManagement: FC = memo(() => {
  const [user] = useOutletContext();

  const filterName = "reportmanagement-filter";
  const defaultFieldValues = {
    byDate: "newToOld",
    byStatus: "Toàn bộ",
    searchTerm: "",
    byType: "Toàn bộ",
    mode: "Của bản thân",
    collab: "",
  };

  const state = useLocation().state;
  if (state) {
    defaultFieldValues.collab = state.collab;
    defaultFieldValues.mode = "Của các cộng tác viên khác";
  }

  const queryKey = ["reports", 1];

  const {
    register,
    data,
    isPending,
    onSubmit,
    error,
    getValues,
    page,
    setPage,
    formErrors,
  } = useFilterFetch<FormData>(
    filterName,
    defaultFieldValues,
    queryKey,
    apiReports.getReportsList
  );

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách reports</h1>
      <Grid container gap={4} py={3}>
        <Grid item xs={0.8}>
          <div className="text-base">Ngày gửi:</div>
        </Grid>
        <Grid item xs={2}>
          <Select id="byDate" {...register("byDate")}>
            <option value={"newToOld"}>Mới nhất</option>
            <option value={"oldToNew"}>Sớm nhất</option>
          </Select>
        </Grid>
        <Grid item xs={0.8}>
          <div className="text-base">Trạng thái:</div>
        </Grid>

        <Grid item xs={2}>
          <Select id="byStatus" {...register("byStatus")}>
            <option value={"Toàn bộ"}>Toàn bộ</option>
            <option value={"Chưa xem"}>Chưa xem</option>
            <option value={"Chưa xử lý"}>Chưa xử lý</option>
            <option value={"Đã xử lý"}>Đã xử lý</option>
          </Select>
        </Grid>
        <Grid item xs={0.2} />
        <Grid item xs={3}>
          <TextInput
            type="text"
            placeholder="Nhập tên người report hoặc bị report"
            {...register("searchTerm")}
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

        <Grid item xs={0.8}>
          <div className="text-base">Loại:</div>
        </Grid>

        <Grid item xs={2}>
          <Select id="byType" {...register("byType")}>
            <option value={"Toàn bộ"}>Toàn bộ</option>
            <option value={"Bình luận"}>Bình luận</option>
            <option value={"Sản phẩm"}>Sản phẩm</option>
            {user.role === "admin" && (
              <option value={"Mua bán"}>Mua bán</option>
            )}
          </Select>
        </Grid>

        {user.role === "admin" && (
          <>
            <Grid item xs={0.8}>
              <div className="text-base">Hiển thị:</div>
            </Grid>

            <Grid item xs={2}>
              <Select
                id="mode"
                {...register("mode")}
                defaultValue={"Của bản thân"}
              >
                <option value={"Của bản thân"}>Của bản thân</option>
                <option value={"Của các cộng tác viên khác"}>
                  Của các cộng tác viên khác
                </option>
              </Select>
            </Grid>

            <Grid item xs={0.2} />
            <Grid item xs={3}>
              <TextInput
                type="text"
                placeholder="Nhập tên cộng tác viên xử lí"
                {...register("collab", {
                  validate: (value) => {
                    if (value !== "" && getValues("mode") !== "Của bản thân")
                      return false;
                    return true;
                  },
                })}
                helperText={
                  formErrors.collab && (
                    <span className="text-red-500">
                      Vui lòng chọn lọc theo cộng tác viên khác.
                    </span>
                  )
                }
              />
            </Grid>
          </>
        )}
      </Grid>

      <hr style={{ borderWidth: "0.01rem" }} />

      {/**Report */}

      <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
        <Grid item xs={1}>
          Loại
        </Grid>
        <Grid item xs={3}>
          Người bị report
        </Grid>
        <Grid item xs={3}>
          Người gửi
        </Grid>
        <Grid item xs={1.5}>
          Trạng thái
        </Grid>
        <Grid item xs={2.5}>
          Thời gian gửi
        </Grid>
      </Grid>
      <hr className="border" />

      {isPending ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage msg={error.message} />
      ) : data.length === 0 ? (
        <ErrorMessage msg={"Không tìm thấy kết quả trùng khớp"} />
      ) : (
        data.map((element: any, index: number) => {
          if (
            user.role === "collab" ||
            (user.role === "admin" && getValues("mode") === "Của bản thân")
          ) {
            if (element[3] === "Chưa xem") {
              return (
                <ListItem
                  key={index}
                  type="report"
                  values={element}
                  className="font-bold"
                />
              );
            } else if (element[3] === "Chưa xử lý") {
              return <ListItem key={index} type="report" values={element} />;
            } else {
              return (
                <ListItem
                  key={index}
                  type="report"
                  values={element}
                  className="bg-[#F2F6FC] hover:bg-[#F2F6FC]"
                />
              );
            }
          } else {
            if (element[3] === "Chưa xem" || element[3] === "Chưa xử lý") {
              return <ListItem key={index} type="report" values={element} />;
            } else {
              return (
                <ListItem
                  key={index}
                  type="report"
                  values={element}
                  className="bg-[#F2F6FC] hover:bg-[#F2F6FC]"
                />
              );
            }
          }
        })
      )}
      <Pagination goToPage={setPage} currentPage={page} />
    </Fragment>
  );
});

export default ReportManagement;
