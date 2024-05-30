import { Button, Modal } from "flowbite-react";

interface ModalReturnInfoProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

export function ModalReturnInfo({ openModal, setOpenModal }: ModalReturnInfoProps) {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Yêu cầu trả hàng</Modal.Header>
        <Modal.Body>
          <div className="flex space-x-4 mb-5">
            <div className="space-y-6">
              <div className="space-y-2">
                <p>Hình ảnh/Video:</p>
                <div className="flex items-center space-x-2">
                  <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716871174/bk_artisan/tmp-1-1716871172110_pj1azo.jpg" alt="" />
                  <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716871174/bk_artisan/tmp-2-1716871172113_gy4s7l.jpg" alt="" />
                  <img className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300 h-28' src="https://res.cloudinary.com/dpurshaxm/image/upload/v1716871174/bk_artisan/tmp-3-1716871172115_on4hpq.jpg" alt="" />
                </div>
              </div>
              <div className="space-y-2">
                <p>Lý do trả hàng:</p>
                <p>Hàng bị rách trong lúc vận chuyển</p>
              </div>
            </div>

          </div>
          <Modal.Footer className="flex justify-between">
            <Button className="bg-orange-500 hover:bg-orange-700" onClick={() => setOpenModal(false)}>Chấp nhận</Button>
            <Button className="border-orange-500 hover:bg-orange-200" color="gray" onClick={() => setOpenModal(false)}>
              Từ chối
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
