import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const Viewproducts: FC = memo(() => {
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // Lặp qua các checkbox khác và cập nhật trạng thái của chúng
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#check_all)');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = isChecked;
    });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


  return (
    <div>
      <SellerSideBar name = "ManageProducts"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link to={"/seller/manage_products/create_product"}>
              <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <FiPlus className = 'w-5 h-5' />
                <p>Thêm</p>
              </div>
            </Link>
            <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
              <PiTrashLight className = 'w-5 h-5'/>
              <p className='pr-4'>Xóa</p>
            </div>
            <div className='w-auto'>
                <div onClick={toggleDropdown} className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
                    <CiFilter className='w-5 h-5'/>
                    <p>Lọc</p>
                    <IoIosArrowDown className='w-5 h-5'/>
                </div>
                <div className={`${isDropdownOpen ? '' : 'hidden'} absolute border rounded-lg min-w-24 bg-white mt-1`}>
                    <p className='border-b hover:bg-gray-300 px-2 cursor-pointer'>aaaaaaa</p>
                    <p className='border-b hover:bg-gray-300 px-2 cursor-pointer'>aaaaaaa</p>
                    <p className='border-b hover:bg-gray-300 px-2 cursor-pointer'>aaaaaaa</p>
                    <p className='border-b hover:bg-gray-300 px-2 cursor-pointer'>aaaaaaa</p>
                </div>
            </div>
          </div>

          
          <div className="max-w-md">   
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500" placeholder="Tìm kiếm sản phẩm" required />
                  
              </div>
          </div>



        </div>
        <table className="table-fixed w-full px-8 mt-5 border">
        
          <thead className='border-b'>
            <tr className=''>
              <th className="py-2 w-1/12 ..."><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300' type="checkbox" onChange={handleSelectAll}/></th>
              <th className="w-1/8 ...">Hình ảnh</th>
              <th className="w-1/4 ...">Tên</th>
              <th className="w-1/8 ...">Giá</th>
              <th className="w-1/8 ...">Số lượng</th>
              <th className="w-1/8 ...">Trạng thái</th>
              <th className="w-1/12 ..."></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center border-b hover:bg-gray-200  '>
              <td><input id='check_1' className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src="https://tangia-khaitruong.com/www/uploads/images/chi%E1%BA%BFu-c%C3%B3i-kim-s%C6%A1n-6.jpg" alt="" /></td>
              <td className='px-10'>Thiệp quà sinh nhật</td>
              <td>15.000</td>
              <td>10</td>
              <td>Đang bán</td>
              <td className='text-blue-600'><Link to="/seller/manage_products/detail/1">Sửa</Link></td>
            </tr>
            <tr className='text-center border-b hover:bg-gray-200 '>
              <td><input id='check_1' className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src="https://tangia-khaitruong.com/www/uploads/images/chi%E1%BA%BFu-c%C3%B3i-kim-s%C6%A1n-6.jpg" alt="" /></td>
              <td className='px-10'>Thiệp quà sinh nhật</td>
              <td>15.000</td>
              <td>10</td>
              <td>Tạm ngưng</td>
              <td className='text-blue-600'><Link to="/seller/manage_products/detail/2">Sửa</Link></td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Viewproducts;
