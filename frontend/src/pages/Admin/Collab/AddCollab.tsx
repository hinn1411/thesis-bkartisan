import { FC, Fragment, memo } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { TextInput, Button, Select } from "flowbite-react";
import { useForm } from "react-hook-form";
import UploadImage from "../../../components/admin/UploadImage";


type FormData = {
  name: string;
  gender: "male" | "female";
  phone: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  address: string;
  image: string;
};

const AddCollab: FC = memo(() => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      image: "",
    }
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Fragment>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thêm cộng tác viên</h1>
        <ReturnIcon />
      </Box>

      <Box display="flex" py={2} component="form" onSubmit={onSubmit}>
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
                <option>Nam</option>
                <option>Nữ</option>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Box className="font-medium pb-2">Số điện thoại</Box>
              <TextInput
                type="text"
                icon={FiPhone}
                {...register("phone", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                  pattern: /^[0-9]+$/,
                })}
                helperText={
                  errors.phone && (
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
              <Box className="font-medium pb-2">Username</Box>
              <TextInput
                type="text"
                {...register("username", { required: true })}
                helperText={
                  errors.username && (
                    <span className="text-red-500">
                      Vui lòng nhập tên tài khoản
                    </span>
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Mặt khẩu</Box>
              <TextInput
                type="password"
                {...register("password", { required: true })}
                helperText={
                  errors.password && (
                    <span className="text-red-500">Vui lòng nhập mặt khẩu</span>
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Box className="font-medium pb-2">Nhập lại mặt khẩu</Box>
              <TextInput
                type="password"
                {...register("repeatPassword", {
                  required: true,
                  validate: (value) => value === getValues("password"),
                })}
                helperText={
                  errors.repeatPassword && (
                    <span className="text-red-500">
                      Nhập lại mặt khẩu không khớp
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
                    <span className="text-red-500">Vui lòng nhập địa chỉ</span>
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
            <UploadImage setValue={setValue} />
            <Box className="text-2xl font-medium py-6">Thêm ảnh đại diện</Box>
            <Button color="blue" type="submit">
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
});

export default AddCollab;
