import { FC, Fragment, memo, useState } from "react";
import { Grid } from "@mui/material";
import ListItem from "../../../components/admin/ListItem";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Select, Button, TextInput } from "flowbite-react";
import useFilterFetch from "../../../hooks/useFilterFetch";
import apiUsers from "../../../apis/apiUsers";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";

type FormData = {
  byDate: "newToOld" | "oldToNew";
  name: string;
};

const CollabManagement: FC = memo(() => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const filterName = "collabmanagement-filter";
  const defaultFieldValues = { byDate: "newToOld", name: "" };
  const queryKey = ["users", page];

  const { register, data, isPending, onSubmit, error } =
    useFilterFetch<FormData>(
      filterName,
      defaultFieldValues,
      queryKey,
      apiUsers.getCollabsList
    );

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách cộng tác viên</h1>
      <Grid container gap={4} py={3}>
        <Grid item xs={0.8}>
          <div className="text-base">Ngày tạo:</div>
        </Grid>
        <Grid item xs={1.5}>
          <Select id="byDate" {...register("byDate")}>
            <option value={"newToOld"}>Mới nhất</option>
            <option value={"oldToNew"}>Sớm nhất</option>
          </Select>
        </Grid>
        <Grid item xs={2.5}>
          <TextInput
            type="text"
            placeholder="Nhập tên cộng tác viên"
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
        <Grid item xs={2} />
        <Grid item>
          <Button
            color="blue"
            fullSized={true}
            onClick={() => navigate("create")}
          >
            Thêm cộng tác viên mới
            <IoMdAddCircleOutline className="ml-3 h-5 w-5" />
          </Button>
        </Grid>
      </Grid>

      <hr style={{ borderWidth: "0.01rem" }} />
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
        <ErrorMessage msg={error.message} />
      ) : data.length === 0 ? (
        <ErrorMessage msg={"Không tìm thấy kết quả trùng khớp"} />
      ) : (
        data.map((element: any, index: number) => {
          return <ListItem key={index} type="user" values={element} />;
        })
      )}
    </Fragment>
  );
});

export default CollabManagement;
