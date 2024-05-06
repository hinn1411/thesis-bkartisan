import { Button, Modal } from "flowbite-react";
import { FC, memo } from "react";
import {
  HiOutlineExclamationCircle,
} from "react-icons/hi";

interface ConfirmModalProps {
  openModal: boolean;
  setOpenModal: Function;
  onSubmit: Function;
}

const ConfirmModal: FC<ConfirmModalProps> = memo(
  ({ openModal, setOpenModal, onSubmit }) => {
    const onConfirm = () => {
        onSubmit();
        setOpenModal(false);
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
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-amber-500" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Xác nhận thay đổi thông tin?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="warning" onClick={onConfirm}>
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
  }
);

export default ConfirmModal;
