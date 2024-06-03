import { Modal } from "flowbite-react";

interface ModalDetailProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

export function ModalDetail({ openModal, setOpenModal }: ModalDetailProps) {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Từ chối duyệt sản phẩm</Modal.Header>
        <Modal.Body>
          <div className="space-x-4">
            <div className="space-y-6">
              <div className="flex space-x-2">
                <p className="w-56">Lý do từ chối: </p>
                <p>Bài đăng chứa những nội dung bất hợp pháp như cá độ, đánh bạc,...</p>
              </div>
              <div className="flex space-x-2">
                <p className="w-44">Thông tin thêm: </p>
                <p>Vui lòng đổi lại hình ảnh</p>
              </div>
            </div>

          </div>
          
        </Modal.Body>
      </Modal>
    </>
  );
}
