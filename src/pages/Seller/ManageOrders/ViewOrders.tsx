import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const ViewOrders: FC = memo(() => {


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // Lặp qua các checkbox khác và cập nhật trạng thái của chúng
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#check_all)');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = isChecked;
    });
  };
  
  const navigate = useNavigate();

  const handleRowClick = (orderId: string) => {
    navigate(`/seller/manage_orders/${orderId}`);
  };

  const handleCheckboxClick = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click trên input lan truyền đến hàng
  };
  
  return (
    <div>
      <SellerSideBar name = "ManageOrders"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
            <PiTrashLight className = 'w-5 h-5'/>
            <p className='pr-4'>Xóa</p>
          </div>
          <div>
            <select className='p-0  hover:drop-shadow-lg border border-gray-300 px-3 rounded-xl text-gray-500  hover:bg-gray-200' id="status">
              <CiFilter className = 'w-5 h-5'/>
              <option selected>Lọc đơn hàng</option>
              <option value="1">Chờ xác nhận</option>
              <option value="2">Chờ lấy hàng</option>
              <option value="3">Đang giao hàng</option>
              <option value="4">Đã giao hàng</option>
              <option value="5">Yêu cầu trả hàng</option>
              <option value="6">Chấp nhận trả hàng</option>
              <option value="7">Đã trả hàng</option>
              <option value="8">Đã hủy</option>
              <option value="9">Gói quà</option>
            </select>
          </div>
          <div>
            <select className='p-0 hover:drop-shadow-lg border border-gray-300 px-3 rounded-xl text-gray-500  hover:bg-gray-200' id="status">
              <option selected>Đổi trạng thái</option>
              <option value="1">Chờ lấy hàng</option>
              <option value="2">Đang giao hàng</option>
            </select>
          </div>
        </div>
        <table className="table-fixed w-full px-8 mt-5 border">
          <thead className='border-b'>
            <tr>
              <th className=" py-2 w-1/12 ..."><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300' type="checkbox" onChange={handleSelectAll}/></th>
              <th className="w-1/8 ...">Mã đơn hàng</th>
              <th className="w-1/8 ...">Tên khách hàng</th>
              <th className="w-1/8 ...">Trạng thái</th>
              <th className="w-1/8 ...">Tổng tiền</th>
              <th className="w-1/8 ...">Thời gian đặt</th>
              <th className="w-1/8 ...">Yêu cầu gói quà</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => handleRowClick('1')} className='text-center  border-b hover:bg-gray-200  '>
              <td onClick={handleCheckboxClick}><input id='check_1' className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td>MT08</td>
              <td>Giang Tuấn Hiền</td>
              <td className='py-1'><p className='p-2 rounded-full bg-blue-100 border'>Chờ xác nhận</p></td>
              <td>200.000</td>
              <td>12h30-13/08/2022</td>
              <td>Có</td>
            </tr>
            <tr onClick={() => handleRowClick('2')} className='text-center border-b hover:bg-gray-200  '>
              <td onClick={handleCheckboxClick}><input id='check_2' className='rounded-sm focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td>MT08</td>
              <td>Lầu Hội</td>
              <td className='py-1'><p className='p-2 rounded-full bg-blue-600 border'>Chấp nhận trả hàng</p></td>
              <td>200.000</td>
              <td>12h30-13/08/2022</td>
              <td>Có</td>
            </tr>
            <tr onClick={() => handleRowClick('3')} className='text-center border-b hover:bg-gray-200  '>
              <td onClick={handleCheckboxClick}><input id='check_2' className='rounded-sm focus:ring-2 focus:ring-orange-300' type="checkbox" /></td>
              <td>MT09</td>
              <td>Chúng Đức Quang</td>
              <td className='py-1'><p className='p-2 rounded-full bg-red-400 border'>Chờ lấy hàng</p></td>
              <td>200.000</td>
              <td>12h30-13/08/2022</td>
              <td>Có</td>
            </tr>
            
           
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ViewOrders;
