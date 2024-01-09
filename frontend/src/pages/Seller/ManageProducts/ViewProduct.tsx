import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
const ViewProduct: FC = memo(() => {
  return (
    <div>
      <SellerSideBar name = "ManageProducts"/>
      
      <div className="p-4 sm:ml-64 mt-16">
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
            <FiPlus className = 'w-5 h-5' />
            <p>Thêm</p>
          </div>
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
        <table className="table-fixed w-full px-8 mt-5">
          <thead className='border-b-8 border-white'>
            <tr>
              <th className="w-1/8 ...">Hình ảnh</th>
              <th className="w-1/4 ...">Tên</th>
              <th className="w-1/8 ...">Giá</th>
              <th className="w-1/8 ...">Số lượng</th>
              <th className="w-1/8 ...">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center border-b-8 hover:bg-gray-200 border-white '>
              <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src="https://down-vn.img.susercontent.com/file/sg-11134201-7rbla-ln193ps73beg14" alt="" /></td>
              <td className='px-10'>Hộp đựng bút chì theo phong cách Liên Xô</td>
              <td>1.500.000</td>
              <td>10</td>
              <td>Đang bán</td>
            </tr>
            <tr className='text-center border-b-8 hover:bg-gray-200 border-white '>
              <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src="https://down-vn.img.susercontent.com/file/sg-11134201-7rbla-ln193ps73beg14" alt="" /></td>
              <td className='px-10'>Hộp đựng bút chì theo phong cách Liên Xô</td>
              <td>1.500.000</td>
              <td>10</td>
              <td>Đang bán</td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ViewProduct;
