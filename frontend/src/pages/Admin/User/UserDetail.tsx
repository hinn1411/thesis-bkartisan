import { FC, Fragment, memo, useState } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline, MdDeleteForever, MdOutlineChat  } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import DeleteModal from "../../../components/admin/modal/DeleteModal";
import LockModal from "../../../components/admin/modal/LockModal";
import TextField from "../../../components/admin/TextField";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const UserDetail: FC = memo(() => {
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [openLockModal, setLockModal] = useState(false);

  return (
    <Fragment>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <ReturnIcon />
      </Box>
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
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Họ và tên</Box>
              <TextField icon={<FaRegUser fill="#64748B" />} value="Lầu Hội"/>
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Giới tính</Box>
              <TextField value="Nam" />
            </Grid>
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Số điện thoại</Box>
              <TextField icon={<FiPhone color="#64748B" />} value="0123456789" />
            </Grid>
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Email</Box>
              <Box
                display="flex"
                className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] p-1 h-9"
              >
                <Box alignSelf={"center"} px={1}>
                  <MdMailOutline color="#64748B" />
                </Box>
                <Box alignSelf={"center"}>lauhoi2010@gmail.com</Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Username</Box>
              <TextField value="lauhoi2010" />
            </Grid>
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Địa chỉ</Box>
              <TextField textarea value="KTX khu A ĐHQG, thành phố Thủ Đức, thành phố Hồ Chí Minh" />
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Ngày tạo tài khoản</Box>
              <TextField value="20/10/2002" />
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Số lần bị khóa tài khoản</Box>
              <TextField value="1" />
            </Grid>
          </Grid>
        </Box>
        <Box className="h-fit border-2 border-slate-300/50 rounded p-4" flexGrow={1}>
          {/**Avatar và tên */}
          <Box
            className="py-2"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Avatar
              src={img_example}
              sx={{ width: "10rem", height: "10rem" }}
            />
            <Box className="text-3xl font-medium py-6">Lầu Hội</Box>
          </Box>
          <Grid container spacing={1.5} p={1} rowGap={1}>
            {/**Button khóa tài khoản */}
            <Grid item xs={6}>
              <Box
                display={"flex"}
                alignItems={"center"}
                className="w-full text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm py-2.5"
                onClick={() => setLockModal(true)}
              >
                <Box px={2}>
                  <CiLock size={"1.5rem"} fill="#ffffff" />
                </Box>
                <Box>Khóa tài khoản</Box>
              </Box>
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
            {/**Button nhắn tin */}
            <Grid item xs={6}>
              <Box
                display={"flex"}
                alignItems={"center"}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm py-2.5"
              >
                <Box px={2}>
                  <MdOutlineChat size={"1.5rem"} fill="#ffffff" />
                </Box>
                <Box>Nhắn tin</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <DeleteModal openModal={openDeleteModal} setOpenModal={setDeleteModal}/>
      <LockModal openModal={openLockModal} setOpenModal={setLockModal} />
    </Fragment>
  );
});

export default UserDetail;
