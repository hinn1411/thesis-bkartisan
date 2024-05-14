import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { ITransport } from "@apis/apiTransport";
import Loading from "../../ManageProducts/Components/OnLoading";

interface CreateTransportProps {
  openModal: boolean;
  onCloseModal: () => void;
  onSave: (transport: ITransport) => void;
  isLoading: boolean;
}

export function CreateTransport({
  openModal,
  onCloseModal,
  onSave, isLoading
}: CreateTransportProps) {
  const [transport, setTransport] = useState({
    location: "",
    deliveryTime: "",
    type: "free",
    price: 0,
    pricePerItem: 0
  });

  function resetTransport() {
    setTransport({
      location: "",
      deliveryTime: "",
      type: "free",
      price: 0,
      pricePerItem: 0
    });
  }

  function handleSave() {
    onSave(transport);
    resetTransport();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { id, value } = event.target;
    setTransport(prevTransport => ({
      ...prevTransport,
      [id]: value
    }));
  }

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        {isLoading && (
          <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
            <Loading />
          </div>
        )}
        <div className="space-y-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Chọn nước vận chuyển
            </label>
            <select
              id="location"
              value={transport.location}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
            >
              <option value="">Chọn nước vận chuyển</option>
              <option value="VietNam">Việt Nam</option>
              <option value="Campuchia">Campuchia</option>
              <option value="China">China</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Chọn khoảng thời gian vận chuyển
            </label>
            <select
              id="deliveryTime"
              value={transport.deliveryTime}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
            >
              <option value="">Chọn loại thời gian</option>
              <option value="5 - 7 ngày">5 - 7 ngày</option>
              <option value="1 - 2 tuần">1 - 2 tuần</option>
              <option value="2 - 3 tuần">2 - 3 tuần</option>
              <option value="3 - 4 tuần">3 - 4 tuần</option>
              <option value="1 - 2 tháng">1 - 2 tháng</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Loại phí
            </label>
            <select
              id="type"
              value={transport.type}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
            >
              <option value="">Chọn loại phí</option>
              <option value="fix">Phí cố định</option>
              <option value="free">Miễn phí</option>
            </select>
          </div>
          {transport.type === 'fix' && (
            <div className="flex space-x-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Một sản phẩm
                </label>
                <input
                  type="number"
                  id="price"
                  value={transport.price}
                  onChange={handleInputChange}
                  className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phí mỗi sản phẩm thêm
                </label>
                <input
                  type="number"
                  id="pricePerItem"
                  value={transport.pricePerItem}
                  onChange={handleInputChange}
                  className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>
          )}

          <div className="w-full">
            <Button className="bg-orange-500 hover:bg-orange-700" onClick={handleSave}>Thêm khu vực vận chuyển</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
