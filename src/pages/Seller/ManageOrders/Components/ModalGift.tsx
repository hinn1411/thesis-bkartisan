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
          <div className="flex space-x-4">
            <p className="w-16">Quà 1:</p>
            <div className="space-y-6">
              <div className="flex items-center space-x-10">
                <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716902879/bk_artisan/tmp-1-1716902875879_thtscd.jpg" alt="" />
              <p>Hộp quà đỏ đẹp</p>
              </div>
              <div className="flex items-center space-x-10">
                <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716902945/bk_artisan/tmp-2-1716902940732_bfre4c.jpg" alt="" />
              <p>Thiệp quà chúc mừng</p>
              </div>
              <div className="flex items-center space-x-10">
                <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28 w-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716871174/bk_artisan/tmp-1-1716871172110_pj1azo.jpg" alt="" />
                <p>Bộ bài ma sói</p>
              </div>
              <div className="flex items-center space-x-10">
                <p>Nội dung thiệp:</p>
                <p>Cảm ơn bạn đã giúp đỡ tôi, đây là món quà dành cho bạn!</p>
              </div>
            </div>

          </div>
          
        </Modal.Body>
      </Modal>
    </>
  );
}
