import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { FiPlus } from 'react-icons/fi';


interface YourComponentProps {}
const ViewTransport: FC<YourComponentProps> = memo(() => {
  const [feeType, setFeeType] = useState<string>('');

  const handleFeeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFeeType(event.target.value);
  };

  const [formChanged, setFormChanged] = useState<boolean>(false);

  // Function to handle changes in the form fields
  const handleInputChange = () => {
    setFormChanged(true);
  };

  return (
    <div>
      <SellerSideBar name = "ManageTransport"/>

      <div className="p-4 sm:ml-64 mt-16">
        
        <form className="max-w-3xl mx-auto" onChange={handleInputChange}>
              <div>
                <div className="flex mb-4 justify-between">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn nước vận chuyển</label>
                    <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7">
                      <option selected>Chọn nước vận chuyển</option>
                      <option value="US">Việt Nam</option>
                    </select>
                  </div>

                  <div className='flex'>
                    <div className=''>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn khoảng thời gian vận chuyển</label>
                      <div className='flex items-center space-x-2'>
                        <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7">
                          <option selected>Chọn loại thời gian</option>
                          <option value="US">5 ngày</option>
                          <option value="CA">1 tuần</option>
                          <option value="FR">2 tuần</option>
                          <option value="DE">3 tuần</option>
                        </select>
                        <p>-</p>
                        <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7">
                          <option selected>Chọn loại sản phẩm</option>
                          <option value="US">7 ngày</option>
                          <option value="CA">2 tuần</option>
                          <option value="FR">3 tuần</option>
                          <option value="DE">5 tuần</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex mb-4 justify-between">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại phí</label>
                    <select
                      id="category"
                      className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
                      onChange={handleFeeTypeChange}
                      value={feeType}
                    >
                      <option value="">Chọn loại loại phí</option>
                      <option value="fixed">Phí cố định</option>
                      <option value="free">Miễn phí</option>
                    </select>
                  </div>
                  {feeType === 'fixed' && (
                    <div className="flex space-x-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Một sản phẩm</label>
                        <input
                          type="text"
                          id="quantity"
                          className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phí mỗi sản phẩm thêm</label>
                        <input
                          type="text"
                          id="additionalFee"
                          className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex items-center space-x-2 mb-10  drop-shadow-lg border  max-w-max px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <FiPlus className = 'w-5 h-5' />
                <p>Thêm các vị trí khác</p>
              </div>
         
              {formChanged && (
                <div id="button" className='flex justify-center space-x-10 sm:space-x-40 '>
                  <button type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Hủy</button>
                  <button type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Lưu</button>
                </div>
              )}
          
        </form>

      </div>
    </div>


  );
});

export default ViewTransport;
