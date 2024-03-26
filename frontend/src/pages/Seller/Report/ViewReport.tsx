import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { FaArrowDown } from "react-icons/fa6";
import ChartComponent from './components/Chart';
import DropdownContent from './components/Dropdown';


const ViewReport: FC = memo(() => {

  return (
    <div>
      <SellerSideBar name = "Report"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='flex items-center space-x-4'>
          <button className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 focus:border-orange-400 focus:bg-orange-300 focus:text-black focus:border-2 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
            <FaArrowDown className='w-5 h-5' />
            <p>Xuất báo cáo</p>
          </button>
          <button className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 focus:border-orange-400 focus:bg-orange-300 focus:text-black focus:border-2 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
            <p className=''>Xem báo cáo theo tháng</p>
          </button>
          <button className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 focus:border-orange-400 focus:bg-orange-300 focus:text-black focus:border-2 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
            <p>Xem báo cáo theo sản phẩm</p>
          </button>
        </div>

        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-2 mt-4">
          <div className="flex justify-between py-2">
            <div className='flex space-x-5'>
              <dl>
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Tổng doanh thu (Triệu Đồng)</dt>
              <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400"></dd>
            </dl>
            </div>
            <DropdownContent />
          </div>

          <ChartComponent/>
          
        </div>
    </div>



    </div>
  );
});

export default ViewReport;
