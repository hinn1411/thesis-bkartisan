import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiX } from "react-icons/hi";

interface FailureAddProps {
  message: string;
}

export function FailureAdd({message }: FailureAddProps) {
    const [openModal, setOpenModal] = useState(true);

    return (
        <>
          <Modal show={openModal}  size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <div className="bg-green ">
                    <HiX className="mx-auto mb-4 h-14 w-14 bg-green text-gray-400 dark:text-gray-200" />
                </div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {message}
                </h3>
                <div className="flex justify-center gap-4">

                  <Button color="failure" onClick={() => setOpenModal(false)}>
                    {"OK"}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      );
}