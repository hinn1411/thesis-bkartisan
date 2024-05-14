import { FC, memo, useEffect, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { FiPlus } from 'react-icons/fi';
import { useQueryTransports } from './Hooks/useQueryTransport';
import { useUpdateTransports, useDeleteTransport, useCreateTransport } from './Hooks/useMunationTransport';
import { ITransport } from '@apis/apiTransport';
import Skeleton from './Components/Skeleton';
import Loading from '../ManageProducts/Components/OnLoading';
import { Success, Error } from '@components/seller/Toast';
import { CreateTransport } from './Components/ModelAddTranport';

interface YourComponentProps {}

const ViewTransport: FC<YourComponentProps> = memo(() => {
  const { data, isFetching, isSuccess, error } = useQueryTransports();
  const updateTransports = useUpdateTransports();
  const createTransport = useCreateTransport();
  const deleteTransport = useDeleteTransport();
  const [transports, setTransports] = useState<ITransport[]>([]);
  const [tempTransports, setTempTransports] = useState<ITransport[]>([]);
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      setTransports(data);
      setTempTransports(data);
    }
  }, [data, isSuccess]);

  console.log(transports);



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (index: number, key: string, value: any) => {
    const updatedTransports = [...tempTransports];
    updatedTransports[index] = { ...updatedTransports[index], [key]: value };
    setTempTransports(updatedTransports);
    setFormChanged(true);
  };

  const handleSave = () => {
    updateTransports.mutate(tempTransports, {
      onSuccess: () => {
        setTransports(tempTransports);
        setFormChanged(false);
      },
    });
  };

  const handleDelete = (transportId: number) => {
    deleteTransport.mutate(transportId);
  };

  const handleCreate = (transport: ITransport) => {
    createTransport.mutate(transport, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  };

  const handleCancel = () => {
    setTempTransports(transports);
    setFormChanged(false);
  };

  return (
    <div>
      <SellerSideBar name="ManageTransport" />

      {isFetching && !isSuccess && <Skeleton />}

      {updateTransports.isSuccess && <Success message='Cập nhật thành công.'></Success>}

      {updateTransports.isError && <Error message='Lỗi cập nhật, vui lòng thử lại!'></Error>}

      {createTransport.isSuccess && <Success message='Thêm thành công.'></Success>}

      {createTransport.isError && <Error message='Lỗi, vui lòng thử lại!'></Error>}

      {deleteTransport.isSuccess && <Success message='Xóa thành công.'></Success>}

      {deleteTransport.isError && <Error message='Lỗi, vui lòng thử lại!'></Error>}

      <div className="p-4 sm:ml-64 mt-16 relative">

      <CreateTransport openModal={openModal} onCloseModal={() =>setOpenModal(false)} onSave={handleCreate} isLoading = {createTransport.isPending}/>

      { (updateTransports.isPending || deleteTransport.isPending ) && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <Loading></Loading>
        </div>
      )


      }
        <form className="max-w-3xl mx-auto">
          {tempTransports.map((transport: ITransport, index: number) => (
            <div key={transport.transportId} className="mb-16">
              <p onClick={() => handleDelete(transport.transportId)} className="text-red-500 cursor-pointer hover:bg-gray-200 p-1 w-36 rounded-md ">Xóa vận chuyển</p>
              <div className="flex mb-4 justify-between">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Chọn nước vận chuyển
                  </label>
                  <select
                    id="location"
                    className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
                    value={transport.location}
                    onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                  >
                    <option value="">Chọn nước vận chuyển</option>
                    <option value="VietNam">Việt Nam</option>
                    <option value="Campuchia">Campuchia</option>
                    <option value="China">China</option>
                  </select>
                </div>

                <div className="flex">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Chọn khoảng thời gian vận chuyển
                    </label>
                    <select
                      id="deliveryTime"
                      className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
                      value={transport.deliveryTime}
                      onChange={(e) => handleInputChange(index, 'deliveryTime', e.target.value)}
                    >
                      <option value="">Chọn loại thời gian</option>
                      <option value="5 - 7 ngày">5 - 7 ngày</option>
                      <option value="1 - 2 tuần">1 - 2 tuần</option>
                      <option value="2 - 3 tuần">2 - 3 tuần</option>
                      <option value="3 - 4 tuần">3 - 4 tuần</option>
                      <option value="1 - 2 tháng">1 - 2 tháng</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex mb-4 justify-between">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Loại phí
                  </label>
                  <select
                    id="type"
                    className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
                    value={transport.type}
                    onChange={(e) => handleInputChange(index, 'type', e.target.value)}
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
                        className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        value={transport.price}
                        onChange={(e) => handleInputChange(index, 'price', e.target.value)}
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
                        className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        value={transport.pricePerItem}
                        onChange={(e) => handleInputChange(index, 'pricePerItem', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div onClick={() => setOpenModal(true)} className="flex items-center space-x-2 mb-10 drop-shadow-lg border max-w-max px-3 rounded-xl text-gray-500 hover:bg-gray-200">
            <FiPlus className="w-5 h-5" />
            <p >Thêm các vị trí khác</p>
          </div>

          {formChanged && (
            <div id="button" className="flex justify-center space-x-10 sm:space-x-40">
              <button
                type="button"
                className="border border-orange-500 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:focus:ring-orange-800"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
});

export default ViewTransport;
