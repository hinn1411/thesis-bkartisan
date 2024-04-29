import { FC, Fragment, memo, useState } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { TextInput, Button, Select, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import UploadImage from "../../../components/admin/UploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiUsers from "../../../apis/apiUsers";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ConfirmModal from "../../../components/admin/modal/ConfirmModal";


type FormData = {
  name: string;
  gender: "M" | "F";
  numPhone: string;
  email: string;
  username: string;
  address: string;
  image: File;
};

const ChangeInfo: FC = memo(() => {
  const [openConfirmModal, setConfirmModal] = useState(false);
  const { id } = useParams();

  const {
    data,
    isPending: fetchIsPending,
    error,
  } = useQuery({
    queryKey: ["userDetails", id],
    queryFn: async () => {
      const user = await apiUsers.getUserDetails(id);
      reset(user);
      return user;
    },
    refetchOnWindowFocus: false,
  });

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const { mutate, isPending: changeIsPending } = useMutation({
    mutationFn: async (values) => {
      return apiUsers.updateInfoCollab(values);
    },
    onSuccess: () => {
      toast.success("Thành công!");
      navigate(`/admin/collabs/${id}`);
    },
    onError: () => {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại.");
    },
  });


  const onOpenModal = handleSubmit((formData) => {
    for (const key in formData) {
      if (data[key] !== formData[key]) {
        setConfirmModal(true);
        break;
      }
    }
  });

  const onSubmit = handleSubmit((formData) => {
    const updatedInfo = {};
    updatedInfo.username = data.username
    for (const key in formData) {
      if (data[key] !== formData[key]) {
        updatedInfo[key] = formData[key];
      }
    }
    mutate(updatedInfo);
  });

  return (
    <Fragment>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thay đổi thông tin</h1>
        {!changeIsPending && <ReturnIcon />}
      </Box>

      {fetchIsPending ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage msg={error.message} />
      ) : (
        <Box
          display="flex"
          py={2}
          component="form"
          onSubmit={onOpenModal}
          className="relative"
        >
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
                <TextInput
                  type="text"
                  icon={FaRegUser}
                  {...register("name", { required: true })}
                  helperText={
                    errors.name && (
                      <span className="text-red-500">
                        Vui lòng nhập họ và tên
                      </span>
                    )
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Box className="font-medium pb-2">Giới tính</Box>
                <Select id="gender" {...register("gender")}>
                  <option value="M">Nam</option>
                  <option value="F">Nữ</option>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Box className="font-medium pb-2">Số điện thoại</Box>
                <TextInput
                  type="text"
                  icon={FiPhone}
                  {...register("numPhone", {
                    required: true,
                    minLength: 7,
                    maxLength: 12,
                    pattern: /^[0-9]+$/,
                  })}
                  helperText={
                    errors.numPhone && (
                      <span className="text-red-500">
                        Vui lòng nhập số điện thoại hợp lệ
                      </span>
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box className="font-medium pb-2">Email</Box>
                <TextInput
                  type="text"
                  icon={MdMailOutline}
                  {...register("email", {
                    required: true,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  helperText={
                    errors.email && (
                      <span className="text-red-500">
                        Vui lòng nhập email hợp lệ
                      </span>
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box className="font-medium pb-2">Địa chỉ</Box>
                <TextInput
                  type="text"
                  {...register("address", { required: true })}
                  helperText={
                    errors.address && (
                      <span className="text-red-500">
                        Vui lòng nhập địa chỉ
                      </span>
                    )
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            className="h-fit border-2 border-slate-300/50 rounded p-4"
            flexGrow={1}
          >
            {/**Thêm ảnh đại diện */}
            <Box
              className="py-2"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <UploadImage setValue={setValue} defaultImg={data.avatar} />
              <Box className="text-2xl font-medium py-6">Thêm ảnh đại diện</Box>
              <Button color="warning" type="submit">
                Xác nhận
              </Button>
            </Box>
          </Box>
          {changeIsPending && (
            <>
              <div className="absolute inset-0 bg-slate-200/25"></div>
              <Spinner size={"xl"} className="absolute top-1/2 left-1/2" />
            </>
          )}
          {openConfirmModal && <ConfirmModal openModal={openConfirmModal} setOpenModal={setConfirmModal} onSubmit={onSubmit} />}
        </Box>
      )}
    </Fragment>
  );
});

export default ChangeInfo;
