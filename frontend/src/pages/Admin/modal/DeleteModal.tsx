import { Button, Modal } from "flowbite-react";
import { FC, memo } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";

interface DeleteModalProps {
  openModal: boolean;
  setOpenModal: Function;
}

const DeleteModal: FC<DeleteModalProps> = memo(
  ({ openModal, setOpenModal }) => {
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
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Bạn có chắc muốn xóa người dùng này?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => setOpenModal(false)}>
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

export default DeleteModal;
