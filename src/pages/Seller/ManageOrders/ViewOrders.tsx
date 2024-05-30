import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import TableLoading from '../ManageProducts/Components/TableLoading';
import { useManageOrderPagination } from './Hooks/userManageOrderPagination';
import { IOrders } from '../../../apis/apiOrders';
import Pagination from '../../../components/common/pagination/Pagination';

const ViewOrders: FC = memo(() => {
  const { data: orders, page, setPage, isSuccess, isFetching } = useManageOrderPagination('');
  // const { data } = useQueryOrderDetail(1);
  // console.log(data)
  
  const navigate = useNavigate();

  const handleRowClick = (orderId: number) => {
    navigate(`/seller/manage_orders/${orderId}`);
  };

  const formatDate = (inputDate: string) => {

    const dateObj = new Date(inputDate);


    const time = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;


    const formattedTime = time;
    const formattedDate = date;


    return `${formattedTime} - ${formattedDate}`;
  };
  
  return (
    <div>
      <SellerSideBar name = "ManageOrders"></SellerSideBar>
      <div className='pt-4 px-4 sm:ml-64 mt-16 max-h-[91vh] min-h-[91vh] flex flex-col justify-between'>
      <div>
        <div className='flex items-center space-x-4'>
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
          {/* <div>
            <select className='p-0 hover:drop-shadow-lg border border-gray-300 px-3 rounded-xl text-gray-500  hover:bg-gray-200' id="status">
              <option selected>Đổi trạng thái</option>
              <option value="1">Chờ lấy hàng</option>
              <option value="2">Đang giao hàng</option>
            </select>
          </div> */}
        </div>
        <table className="table-fixed w-full px-8 mt-5 border">
          <thead className='border-b'>
            <tr>
              {/* <th className=" py-2 w-1/12 ..."><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300 hidden' type="checkbox"/></th> */}
              <th className="py-2 w-1/8 ...">Mã đơn hàng</th>
              <th className="w-1/8 ...">Tên khách hàng</th>
              <th className="w-1/8 ...">Trạng thái</th>
              <th className="w-1/8 ...">Tổng tiền</th>
              <th className="w-1/8 ...">Thời gian đặt</th>
              <th className="w-1/8 ...">Yêu cầu gói quà</th>
            </tr>
          </thead>
          <tbody>
          {isFetching && (
              <TableLoading></TableLoading>
            )}
            {isSuccess && !isFetching && orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4">Không có đơn hàng</td>
                </tr>
          )}
           {isSuccess && !isFetching && (
              <>
                {orders.map((order: IOrders) => (
                  <tr key={order.orderId} onClick={() => handleRowClick(order.orderId)} className='text-center border-b hover:bg-gray-200'>
                    {/* <td ><input id='check_1' className='hidden rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" /></td> */}
                    <td>{order.orderId}</td>
                    <td>{order.buyer}</td>
                    <td className='py-1'><p className='p-2 rounded-full bg-blue-100 border'>{order.status}</p></td>
                    <td>{order.total}</td>
                    <td>{formatDate(order.createAt.toLocaleString())}</td>
                    <td>{order.hasGift ? 'Có' : 'Không'}</td>
                  </tr>
                ))}
              </>
            )}
            
           
          </tbody>
        </table>
      </div>
      <div> 
            <Pagination currentPage={page} goToPage={setPage} />
      </div>
      </div>
    </div>
  );
});

export default ViewOrders;
