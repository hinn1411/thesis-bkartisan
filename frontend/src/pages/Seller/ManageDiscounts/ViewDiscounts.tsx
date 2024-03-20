import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const ViewDiscounts: FC = memo(() => {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // Lặp qua các checkbox khác và cập nhật trạng thái của chúng
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#check_all)');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = isChecked;
    });
  };



  return (
    <div>
      <SellerSideBar name = "ManageDiscounts"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='flex items-center space-x-4'>
          <Link to={"/seller/manage_discounts/create_discount"}>
            <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
              <FiPlus className = 'w-5 h-5' />
              <p>Thêm</p>
            </div>
          </Link>
          <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
            <PiTrashLight className = 'w-5 h-5'/>
            <p className='pr-4'>Xóa</p>
          </div>
          <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
            <CiFilter className = 'w-5 h-5'/>
            <p>Lọc</p>
            <IoIosArrowDown className = 'w-5 h-5'/>
          </div>
        </div>
        <table className="table-fixed w-full px-8 mt-5 border">
          <thead className='border-b'>
            <tr>
              <th className="py-2 w-1/12 ..."><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300' type="checkbox" onChange={handleSelectAll}/></th>
              <th className="w-1/12 ...">Mã</th>
              <th className="w-1/8 ...">Loại mã giảm</th>
              <th className="w-1/8 ...">Giá trị giảm</th>
              <th className="w-1/8 ...">Ngày bắt đầu</th>
              <th className="w-1/8 ...">Ngày hết hạn</th>
              <th className="w-1/8 ...">Số lượng</th>
              <th className="w-1/12 ..."></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center border-b hover:bg-gray-200'>
              <td className='py-2'><input id='check_1' className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td >ABCDEF</td>
              <td>Giảm theo %</td>
              <td>10%</td>
              <td>01/11/2023</td>
              <td>30/11/2023</td>
              <td>10</td>
              <td className='text-blue-600'><Link to="/seller/manage_discounts/change_discount/1">Sửa</Link></td>
            </tr>
            <tr className='text-center border-b hover:bg-gray-200'>
              <td className='py-2'><input id='check_1' className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td >ABCDEF</td>
              <td>Giảm theo %</td>
              <td>10%</td>
              <td>01/11/2023</td>
              <td>30/11/2023</td>
              <td>10</td>
              <td className='text-blue-600'><Link to="/seller/manage_discounts/change_discount/1">Sửa</Link></td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ViewDiscounts;
