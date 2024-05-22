import { Grid } from "@mui/material";
import { Button, Modal, Select, Spinner, Textarea } from "flowbite-react";
import { FC, memo } from "react";
import apiUsers from "../../../apis/apiUsers";
import useFormResponse from "../../../hooks/useFormReponse";
import { comment, product } from "@contants/response";

interface ResponseModalProps {
  openModal: boolean;
  setOpenModal: Function;
  type: "delete-product" | "delete-comment" | "reject-product";
  id: any;
}

type FormData = {
  reason: string;
  response: string;
};

const ResponseModal: FC<ResponseModalProps> = memo(
  ({ openModal, setOpenModal, type, id }) => {
    const options = (type === "delete-product" || type === "reject-product") ? product : comment;

    const foo = () => [];

    const { register, handleSubmit, mutate, isPending, errors } =
      useFormResponse<FormData>(
        [type, id],
        setOpenModal,
        //apiUsers.lockUser
        foo
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
                {type === "delete-comment"
                  ? "Lí do xóa bình luận: "
                  : type === "delete-product"
                  ? "Lí do xóa sản phẩm: "
                  : "Lí do từ chối duyệt bài đăng: "}
              </Grid>
              <Grid item xs={8}>
                <Select id="reason" {...register("reason")}>
                  {
                    options.map((val) => <option key={val} value={val}>{val}</option>)
                  }
                </Select>
              </Grid>
              <Grid item xs={4}>
                Miêu tả thêm và đề xuất: 
              </Grid>
              <Grid item xs={8}>
                <Textarea
                  id="additional-info"
                  placeholder="Điền phản hồi vào đây"
                  required
                  rows={4}
                  {...register("response", { required: true })}
                  helperText={
                    errors.response && (
                      <span className="text-red-500">
                        Vui lòng nhập phản hồi.
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

export default ResponseModal;
