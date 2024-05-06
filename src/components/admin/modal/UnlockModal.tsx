import { Button, Modal } from "flowbite-react";
import { FC, memo } from "react";
import { CiUnlock } from "react-icons/ci";
import useFormResponse from "../../../hooks/useFormReponse";
import apiUsers from "../../../apis/apiUsers";

interface UnlockModalProps {
  openModal: boolean;
  setOpenModal: Function;
  id: string
}

const UnlockModal: FC<UnlockModalProps> = memo(({ openModal, setOpenModal, id }) => {
  const {mutate, isPending} = useFormResponse(["userDetails", id], setOpenModal, apiUsers.unlockUser);
  
  const onSubmit = () => {
    const values = {
      id
    }
    mutate(values);
  }

  return (
    <>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <CiUnlock className="mx-auto mb-4 h-14 w-14 text-green-600" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Bạn có chắc muốn mở khóa người dùng này?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="success" onClick={onSubmit} disabled={isPending}>
                  {"Xác nhận"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Hủy
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
  );
});

export default UnlockModal;
