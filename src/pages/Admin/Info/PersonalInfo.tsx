import { FC, Fragment, memo } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline, MdOutlineChat } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiUsers from "../../../apis/apiUsers";
import TextField from "../../../components/admin/TextField";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import { formatDate } from "../../../utils/formatDate";

const PersonalInfo: FC = memo(() => {
  const navigate = useNavigate();
  const [user] = useOutletContext();

  const { data, isPending, error } = useQuery({
    queryKey: ["userDetails", user.username],
    queryFn: async () => {
      return await apiUsers.getUserDetails(user.username);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Fragment>
      {isPending ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage msg={error.message} />
      ) : (
        <>
          <Box display="flex" py={2}>
            <Box
              width={6 / 10}
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
                    //onClick={() => navigate("change")}
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
                      navigate("/admin/message", { state: { username: "hiamlauhoi", name: "hiamlauhoi", avatar: null } })
                    }
                  >
                    <Box px={1.5}>
                      <MdOutlineChat size={"1.5rem"} fill="#ffffff" />
                    </Box>
                    <Box>Nhắn tin với Admin</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Fragment>
  );
});

export default PersonalInfo;
