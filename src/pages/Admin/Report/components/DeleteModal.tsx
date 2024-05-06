import { Grid } from "@mui/material";
import {
  Button,
  Modal,
  Select,
  Spinner,
  Textarea,
} from "flowbite-react";
import { FC, memo } from "react";
import apiUsers from "../../../apis/apiUsers";
import useFormResponse from "../../../../hooks/useFormReponse";

interface DeleteModalProps {
  openModal: boolean;
  setOpenModal: Function;
  id: string;
}

type FormData = {
  lockTime: string;
  email: string;
  response: string;
};

const DeleteModal: FC<DeleteModalProps> = memo(
  ({ openModal, setOpenModal, id }) => {
    const { register, handleSubmit, mutate, isPending } =
      useFormResponse<FormData>(
        ["userDetails", id],
        setOpenModal,
        apiUsers.lockUser
      );

    const onSubmit = (data) => {
      const values = {
        id,
        response: data,
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
                Loại vi phạm
              </Grid>
              <Grid item xs={8}>
                <Select id="lockTime" {...register("lockTime")}>
                  <option value={"1-week"}>1 tuần</option>
                  <option value={"1-month"}>1 tháng</option>
                  <option value={"3-month"}>3 tháng</option>
                </Select>
              </Grid>
              <Grid item xs={4}>
                Miêu tả thêm và đề xuất
              </Grid>
              <Grid item xs={8}>
                <Textarea
                  id="comment"
                  placeholder="Điền phản hồi vào đây"
                  required
                  rows={4}
                  {...register("response")}
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

export default DeleteModal;
