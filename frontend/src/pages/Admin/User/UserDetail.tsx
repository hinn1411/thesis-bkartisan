import { FC, Fragment, memo, useState } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline, MdDeleteForever, MdOutlineChat } from "react-icons/md";
import { CiLock, CiUnlock } from "react-icons/ci";
import DeleteModal from "../../../components/admin/modal/DeleteModal";
import LockModal from "../../../components/admin/modal/LockModal";
import UnlockModal from "../../../components/admin/modal/UnlockModal";
import TextField from "../../../components/admin/TextField";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiUsers from "../../../apis/apiUsers";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import { checkLockStatus } from "../../../utils/checkLockStatus";

const UserDetail: FC = memo(() => {
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [openLockModal, setLockModal] = useState(false);
  const [openUnlockModal, setUnlockModal] = useState(false);

  const { id } = useParams();

  const { data, isFetching, isSuccess, isPending, error } = useQuery({
    queryKey: ["userDetails", id],
    queryFn: async () => {
      return await apiUsers.getUserDetails(id);
    },
    refetchOnWindowFocus: false,
  });

  const openLockOrUnlock = () => {
    if (checkLockStatus(data.lockUntil)) {
      setUnlockModal(true);
    } else {
      setLockModal(true);
    }
  };

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
                  <TextField
                    icon={<FaRegUser fill="#64748B" />}
                    value={data.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box className="font-medium pb-2">Giới tính</Box>
                  <TextField
                    value={
                      data.gender === "M"
                        ? "Nam"
                        : data.gender === "F"
                        ? "Nữ"
                        : "Chưa xác định"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Số điện thoại</Box>
                  <TextField
                    icon={<FiPhone color="#64748B" />}
                    value={data.numPhone || "Chưa xác định"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Email</Box>
                  <TextField
                    icon={<MdMailOutline color="#64748B" />}
                    value={data.email || "Chưa xác định"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Username</Box>
                  <TextField value={data.username} />
                </Grid>
                <Grid item xs={12}>
                  <Box className="font-medium pb-2">Địa chỉ</Box>
                  <TextField textarea value={data.address || "Chưa xác định"} />
                </Grid>
                <Grid item xs={6}>
                  <Box className="font-medium pb-2">Ngày tạo tài khoản</Box>
                  <TextField value={data.createdAt} />
                </Grid>
                <Grid item xs={6}>
                  <Box className="font-medium pb-2">
                    Số lần bị khóa tài khoản
                  </Box>
                  <TextField value={data.lockCount || 0} />
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
                  sx={{ width: "10rem", height: "10rem" }}
                  src={data.avatar}
                />
                <Box className="text-3xl font-medium py-6">{data.name}</Box>
              </Box>
              <Grid container spacing={1.5} p={1} rowGap={1}>
                {/**Button khóa tài khoản */}
                <Grid item xs={6}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    className={
                      "w-full text-white font-medium rounded-lg text-sm py-2.5 " +
                      (!checkLockStatus(data.lockUntil)
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-green-500 hover:bg-green-600")
                    }
                    onClick={openLockOrUnlock}
                  >
                    <Box px={2}>
                      {!checkLockStatus(data.lockUntil) ? (
                        <CiLock size={"1.5rem"} fill="#ffffff" />
                      ) : (
                        <CiUnlock size={"1.5rem"} fill="#ffffff" />
                      )}
                    </Box>
                    <Box>
                      {!checkLockStatus(data.lockUntil)
                        ? "Khóa tài khoản"
                        : "Mở khóa tài khoản"}
                    </Box>
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
          <DeleteModal
            openModal={openDeleteModal}
            setOpenModal={setDeleteModal}
          />
          <LockModal
            openModal={openLockModal}
            setOpenModal={setLockModal}
            id={data.username}
          />
          <UnlockModal
            openModal={openUnlockModal}
            setOpenModal={setUnlockModal}
            id={data.username}
          />
        </>
      )}
    </Fragment>
  );
});

export default UserDetail;
