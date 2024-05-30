import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { FaArrowDown } from "react-icons/fa6";
import ChartComponent from './components/Chart';
import DropdownContent from './components/Dropdown';
import TableComponent from './components/Table';
import { axiosClient } from '@apis/axiosClient';


const ViewReport: FC = memo(() => {
  const [chart, setChart] = useState<boolean>(true);
  const [table, setTable] = useState<boolean>(false);

  const [year, setYear] = useState<number>(2024);

  const handleDownload = async () => {
    try {
      const response = await axiosClient.get('/download/reportSale', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reportSale.xlsx'); 
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  return (
    <div>
      <SellerSideBar name = "Report"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='flex items-center space-x-4'>
          <button onClick={handleDownload}  className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 focus:border-orange-400 focus:bg-orange-300 focus:text-black focus:border-2 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
            <FaArrowDown className='w-5 h-5' />
            <p>Xuất báo cáo</p>
          </button>
          <button onClick={() => {setChart(true);setTable(false)}} className={`flex items-center space-x-2 drop-shadow-lg border w-25 px-3 ${chart ? `focus:border-orange-400 focus:bg-orange-300 `  : ""} focus:text-black focus:border-2 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer`}>
            <p className=''>Xem báo cáo theo biểu đồ</p>
          </button>
          <button onClick={() => {setChart(false);setTable(true)}} className={`flex items-center space-x-2 drop-shadow-lg border w-25 px-3 ${table ? `focus:border-orange-400 focus:bg-orange-300 `  : ""} focus:text-black focus:border-2 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer`}>
            <p>Xem báo cáo theo sản phẩm</p>
          </button>
        </div>
        {chart &&
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-2 mt-4">
          <div className="flex justify-between py-2">
            <div className='flex space-x-5'>
              <dl>
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Tổng doanh thu (Triệu Đồng)</dt>
              <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400"></dd>
            </dl>
            </div>
            <DropdownContent onSelectYear={setYear}/>
          </div>

           <ChartComponent year={year}></ChartComponent>
        </div>
        }
        {table && <TableComponent></TableComponent>}
    </div>



    </div>
  );
});

export default ViewReport;
