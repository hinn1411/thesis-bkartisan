import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ConfirmProps {
  openModal: boolean;
  onConfirmDelete: () => void;
  onClose: () => void;
  message: string;
}

export function Confirm({ openModal, onConfirmDelete, onClose, message }: ConfirmProps) {
  return (
    <Modal show={openModal} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirmDelete}>
              {"Xác nhận"}
            </Button>
            <Button color="gray" onClick={onClose}>
              Hủy
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
