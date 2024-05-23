import { FC, Fragment, memo, useState } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline, MdDeleteForever, MdOutlineChat } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { LuPenLine } from "react-icons/lu";
import DeleteModal from "../../../components/admin/modal/DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiUsers from "../../../apis/apiUsers";
import TextField from "../../../components/admin/TextField";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import { formatDate } from "../../../utils/formatDate";

const CollabDetail: FC = memo(() => {
  const [openDeleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isFetching, isSuccess, isPending, error } = useQuery({
    queryKey: ["userDetails", id],
    queryFn: async () => {
      return await apiUsers.getUserDetails(id);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Fragment>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <ReturnIcon />
      </Box>
      {isPending ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage msg={error.message} />
      ) : (
        <>
          <Box display="flex" py={2}>
            <Box
              width={"100%"}
              className="border-2 border-slate-300/50 rounded p-4"
            >
              <Grid container spacing={1.5} p={1} rowGap={1}>
                <Grid item xs={12}>
                  <Box pb={1} className="font-semibold border-b-2">
                    Thông tin cá nhân
                  </Box>
                </Grid>
                {/**Họ và tên */}
                <Grid item xs={6}>
                  <Box className="font-medium pb-2">Họ và tên</Box>
                  <TextField
                    icon={<FaRegUser fill="#64748B" />}
                    value={data.name}
                  />
                </Grid>
                {/**Giới tính */}
                <Grid item xs={6}>
                  <Box className="font-medium pb-2">Giới tính</Box>
                  <TextField value={
                      data.gender === "M"
                        ? "Nam"
                        : data.gender === "F"
                        ? "Nữ"
                        : "Chưa xác định"
                    } />
                </Grid>
                {/**Số điên thoại */}
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Số điện thoại</Box>
                  <TextField
                    icon={<FiPhone color="#64748B" />}
                    value={data.numPhone || "Chưa xác định"}
                  />
                </Grid>
                {/**Email */}
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Email</Box>
                  <TextField
                    icon={<MdMailOutline color="#64748B" />}
                    value={data.email || "Chưa xác định"}
                  />
                </Grid>
                {/**Username */}
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Username</Box>
                  <TextField value={data.username || "Chưa xác định"}/>
                </Grid>
                {/**Địa chỉ */}
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Địa chỉ</Box>
                  <TextField
                    textarea
                    value={data.address || "Chưa xác định"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box className="font-medium pb-2">Ngày tạo tài khoản</Box>
                  <TextField value={formatDate("dd/mm/yyyy", new Date(data.createdAt))} />
                </Grid>
              </Grid>
            </Box>
            <Box
              className="h-fit border-2 border-slate-300/50 rounded p-4"
              flexGrow={1}
            >
              {/**Avatar và tên */}
              <Box
                className="py-2"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Avatar
                  src={data.avatar}
                  sx={{ width: "10rem", height: "10rem" }}
                />
                <Box className="text-3xl font-medium py-6">{data.name}</Box>
              </Box>
              <Grid container spacing={1.5} p={1} rowGap={1}>
                {/**Button thay đổi thông tin */}
                <Grid item xs={6}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    className="w-full text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm py-2.5"
                    onClick={() => navigate("change")}
                  >
                    <Box px={2}>
                      <LuPenLine size={"1.5rem"} fill="#ffffff" />
                    </Box>
                    <Box>Sửa thông tin</Box>
                  </Box>
                </Grid>
                {/**Button nhắn tin */}
                <Grid item xs={6}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm py-2.5"
                    onClick={() =>
                      navigate("/admin/message", { state: { username: data.username, name: data.name, avatar: data.avatar } })
                    }
                  >
                    <Box px={2}>
                      <MdOutlineChat size={"1.5rem"} fill="#ffffff" />
                    </Box>
                    <Box>Nhắn tin</Box>
                  </Box>
                </Grid>
                {/**Button sản phẩm đã duyệt */}
                <Grid item xs={6}>
                  {/* <Link to="products" state={{name: "Lầu Hội"}}> */}
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    className="w-full text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm py-2.5"
                    onClick={() =>
                      navigate("products", { state: { name: "Lầu Hội" } })
                    }
                  >
                    <Box px={2}>
                      <FaClipboardCheck size={"1.5rem"} fill="#ffffff" />
                    </Box>
                    <Box>Sản phẩm đã duyệt</Box>
                  </Box>
                  {/* </Link> */}
                </Grid>
                {/**Button report đã xử lý */}
                <Grid item xs={6}>
                  {/* <Link to="reports"> */}
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    className="w-full text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm py-2.5"
                  >
                    <Box px={2}>
                      <HiOutlineExclamationCircle size={"1.5rem"} />
                    </Box>
                    <Box>Report đã xử lí</Box>
                  </Box>
                  {/* </Link> */}
                </Grid>
                {/**Button xóa tài khoản */}
                <Grid item xs={6}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    className="w-full text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm py-2.5"
                    onClick={() => setDeleteModal(true)}
                  >
                    <Box px={2}>
                      <MdDeleteForever size={"1.5rem"} fill="#ffffff" />
                    </Box>
                    <Box>Xóa tài khoản</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <DeleteModal
            openModal={openDeleteModal}
            setOpenModal={setDeleteModal}
          />
        </>
      )}
    </Fragment>
  );
});

export default CollabDetail;
