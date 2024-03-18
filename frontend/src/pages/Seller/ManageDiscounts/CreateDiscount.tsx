import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface YourComponentProps {}
const CreateDiscount: FC<YourComponentProps> = memo(() => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange: ReactDatePickerProps['onChange'] = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange: ReactDatePickerProps['onChange'] = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <SellerSideBar name = "ManageDiscounts"/>

      <div className="p-4 sm:ml-64 mt-16">
        
        <form className="max-w-3xl mx-auto">

          <div className="flex mb-4 justify-between">
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã giảm giá</label>
            <input type="text" id="Price" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
          </div>

          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại mã giảm</label>
              <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ">
                <option selected>Chọn loại mã giảm</option>
                <option value="US">Giảm theo phần trăm</option>
                <option value="CA">Giảm cố định</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá trị giảm</label>
              <input type="text" id="Material" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
          </div>
          
          <div className="flex mb-4 justify-between">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu</label>
                  <div className='flex items-center'>
                    <DatePicker
                        
                      selected={startDate} // Pass selected date
                      className='shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 '
                      placeholderText="Select date"
                      onChange={handleStartDateChange} // Add onChange prop
                    />
                  </div>

            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc</label>
                  <div className='flex items-center'>
                    <DatePicker
                        
                      selected={endDate} // Pass selected date
                      className='shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 '
                      placeholderText="Select date"
                      onChange={handleEndDateChange} // Add onChange prop
                    />
                  </div>

            </div>
          </div>

          <div className="flex mb-10 justify-between">
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
            <input type="text" id="Price" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
          </div>
          
          <div className='flex justify-center space-x-10 sm:space-x-40 '>
            <button type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Hủy</button>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Thêm</button>
            
          </div>
          
        </form>

      </div>
    </div>


  );
});

export default CreateDiscount;
