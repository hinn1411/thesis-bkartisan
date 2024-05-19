import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { Link } from 'react-router-dom';

interface SuccessAddProps {
  onDismiss: () => void;
  url: string;
  message: string;
}

export function SuccessAdd({ onDismiss, url, message }: SuccessAddProps) {
    const [openModal, setOpenModal] = useState(true);

    const handleDismiss = () => {
        setOpenModal(false);
        onDismiss();
    };
    return (
        <>
          <Modal show={openModal}  size="md" onClose={handleDismiss} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <div className="bg-green ">
                    <HiCheck className="mx-auto mb-4 h-14 w-14 bg-green text-gray-400 dark:text-gray-200" />
                </div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {message}
                </h3>
                <div className="flex justify-center gap-4">
                  <Link to={url}>
                  <Button color="success" >
                    {"OK"}
                  </Button>
                  </Link>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      );
}