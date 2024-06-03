import { Modal } from "flowbite-react";

interface ModalGiftInfoProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

export function ModalGiftInfo({ openModal, setOpenModal }: ModalGiftInfoProps) {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thông tin gói quà</Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-lg">Hộp quà</p>
                <div className="flex items-center space-x-10">
                  <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716902879/bk_artisan/tmp-1-1716902875879_thtscd.jpg" alt="" />
                  <p>Hộp quà đỏ đẹp</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-lg">Thiệp quà</p>
                <div className="flex items-center space-x-10">
                  <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716902879/bk_artisan/tmp-1-1716902875879_thtscd.jpg" alt="" />
                  <p>Hộp quà đỏ đẹp</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-lg">Nội dung thiệp:</p>
                <p>Cảm ơn bạn đã giúp đỡ tôi, đây là món quà dành cho bạn!</p>
              </div>
            </div>
          
        </Modal.Body>
      </Modal>
    </>
  );
}
