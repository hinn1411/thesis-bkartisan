import { Button, Modal, Spinner, TextInput, Textarea } from "flowbite-react";
import { FC, memo } from "react";
import useFormResponse from "../../../hooks/useFormReponse";
import apiUsers from "../../../apis/apiUsers";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
  openModal: boolean;
  setOpenModal: Function;
}

type FormData = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const ChangePasswordModal: FC<ChangePasswordModalProps> = memo(
  ({ openModal, setOpenModal }) => {
    const {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();

    const { mutate, isPending } = useMutation({
      mutationFn: async (values) => {
        return apiUsers.updatePassword(values);
      },
      onSuccess: () => {
        toast.success("Thành công!");
        setOpenModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    const onSubmit = (data) => {
      const values = {
        password: data.oldPassword,
        newPassword: data.newPassword,
      };
      mutate(values);
    };

    return (
      <>
        <Modal show={openModal} size="4xl" onClose={() => setOpenModal(false)}>
          <Modal.Header>Điền Form phản hồi</Modal.Header>
          <Modal.Body className="relative">
            <Grid container spacing={1.5} p={1} rowGap={1}>
              <Grid item xs={4}>
                Nhập mặt khẩu cũ:
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="password"
                  {...register("oldPassword", { required: true })}
                  helperText={
                    errors.oldPassword && (
                      <span className="text-red-500">
                        Vui lòng nhập mặt khẩu cũ
                      </span>
                    )
                  }
                />
              </Grid>
              <Grid item xs={4}>
                Nhập mặt khẩu mới:
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="password"
                  {...register("newPassword", { required: true })}
                  helperText={
                    errors.newPassword && (
                      <span className="text-red-500">
                        Vui lòng nhập mặt khẩu mới
                      </span>
                    )
                  }
                />
              </Grid>
              <Grid item xs={4}>
                Nhập lại mặt khẩu mới:
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="password"
                  {...register("repeatPassword", {
                    required: true,
                    validate: (value) => value === getValues("newPassword"),
                  })}
                  helperText={
                    errors.repeatPassword && (
                      <span className="text-red-500">
                        Mặt khẩu bạn nhập không khớp với mặt khẩu mới
                      </span>
                    )
                  }
                />
              </Grid>
            </Grid>
            {isPending && (
              <>
                <div className="absolute inset-0 bg-slate-200/25"></div>
                <Spinner size={"xl"} className="absolute top-1/2 left-1/2" />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex flex-row-reverse gap-4 w-full">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Hủy
              </Button>
              <Button
                color="success"
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {"Xác nhận"}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
);

export default ChangePasswordModal;
