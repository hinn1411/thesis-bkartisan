import { Grid } from "@mui/material";
import { Button, Modal, Select, Textarea } from "flowbite-react";
import { FC, memo } from "react";

interface LockModalProps {
  openModal: boolean;
  setOpenModal: Function;
}

const LockModal: FC<LockModalProps> = memo(({ openModal, setOpenModal }) => {
  return (
    <>
      <Modal show={openModal} size="4xl" onClose={() => setOpenModal(false)}>
        <Modal.Header>Điền Form phản hồi</Modal.Header>
        <Modal.Body>
          <Grid container spacing={1.5} p={1} rowGap={1}>
            <Grid item xs={4}>
              Khoảng thời gian khóa:
            </Grid>
            <Grid item xs={8}>
              <Select id="gender">
                <option>Lí do 1</option>
                <option>Lí do 1</option>
              </Select>
            </Grid>
            <Grid item xs={4}>
              Email phản hồi:
            </Grid>
            <Grid item xs={8}>
              <Select id="gender">
                <option>Lí do 1</option>
                <option>Lí do 1</option>
              </Select>
            </Grid>
            <Grid item xs={4}>
              Lí do khóa tài khoản:
            </Grid>
            <Grid item xs={8}>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row-reverse gap-4 w-full">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Hủy
            </Button>
            <Button color="success" onClick={() => setOpenModal(false)}>
              {"Xác nhận"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default LockModal;
