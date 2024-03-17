import { FC, Fragment, memo, useState } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import ReturnIcon from "../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline, MdDeleteForever, MdOutlineChat } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { LuPenLine } from "react-icons/lu";
import DeleteModal from "./modal/DeleteModal";
import { Link } from "react-router-dom";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const CollabDetail: FC = memo(() => {
  const [openDeleteModal, setDeleteModal] = useState(false);

  return (
    <Fragment>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <ReturnIcon />
      </Box>
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
              <Box
                display="flex"
                className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] p-1 h-9"
              >
                <Box alignSelf={"center"} px={1}>
                  <FaRegUser fill="#64748B" />
                </Box>
                <Box alignSelf={"center"}>Lầu Hội</Box>
              </Box>
            </Grid>
            {/**Giới tính */}
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Giới tính</Box>
              <Box className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] py-1 px-5 h-9">
                Nam
              </Box>
            </Grid>
            {/**Số điên thoại */}
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Số điện thoại</Box>
              <Box
                display="flex"
                className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] p-1 h-9"
              >
                <Box alignSelf={"center"} px={1}>
                  <FiPhone color="#64748B" />
                </Box>
                <Box alignSelf={"center"}>0123456789</Box>
              </Box>
            </Grid>
            {/**Email */}
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
            {/**Username */}
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Username</Box>
              <Box className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] py-1 px-5 h-9">
                lauhoi2010
              </Box>
            </Grid>
            {/**Địa chỉ */}
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Địa chỉ</Box>
              <Box className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] py-1 px-5 h-auto break-all">
                KTX khu A ĐHQG, thành phố Thủ Đức, thành phố Hồ Chí Minh
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Ngày tạo tài khoản</Box>
              <Box className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] py-1 px-5 h-9">
                20/10/2002
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">
                Lần duyệt bài đăng mới nhất
              </Box>
              <Box className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] py-1 px-5 h-9">
                1
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Lần xử lí report mới nhất</Box>
              <Box className="bg-[#eff4fb] rounded-[4px] border border-solid border-[#3c50e0] py-1 px-5 h-9">
                1
              </Box>
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
              src={img_example}
              sx={{ width: "10rem", height: "10rem" }}
            />
            <Box className="text-3xl font-medium py-6">Lầu Hội</Box>
          </Box>
          <Grid container spacing={1.5} p={1} rowGap={1}>
            {/**Button thay đổi thông tin */}
            <Grid item xs={6}>
              <Box
                display={"flex"}
                alignItems={"center"}
                className="w-full text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm py-2.5"
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
              >
                <Box px={2}>
                  <MdOutlineChat size={"1.5rem"} fill="#ffffff" />
                </Box>
                <Box>Nhắn tin</Box>
              </Box>
            </Grid>
            {/**Button sản phẩm đã duyệt */}
            <Grid item xs={6}>
              <Link to="products">
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  className="w-full text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm py-2.5"
                >
                  <Box px={2}>
                    <FaClipboardCheck size={"1.5rem"} fill="#ffffff" />
                  </Box>
                  <Box>Sản phẩm đã duyệt</Box>
                </Box>
              </Link>
            </Grid>
            {/**Button report đã xử lý */}
            <Grid item xs={6}>
              <Link to="reports">
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
              </Link>
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
      <DeleteModal openModal={openDeleteModal} setOpenModal={setDeleteModal} />
    </Fragment>
  );
});

export default CollabDetail;
