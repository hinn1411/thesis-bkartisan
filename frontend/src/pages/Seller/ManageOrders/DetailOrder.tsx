import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { useParams } from 'react-router-dom';


const DetailOrders: FC = memo(() => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div>
      <SellerSideBar name = "ManageOrders"></SellerSideBar>
      <div id={`${orderId}`} className="p-4 sm:ml-64 mt-16">
        <div className='grid grid-cols-2 gap-x-3' style={{ gridTemplateColumns: '45% 55%' }}>
          <div className='col-span-5/12 space-y-3'>
            <div className='border rounded-md p-2 space-y-3 shadow-md'>
              <p className='border-b-2 border-gray-300 text-xl pb-2'>Thông tin khách hàng</p>
              <div className='flex justify-between space-x-5'>
                <p className=''>Tên</p>
                <p className=''>Giang Tuấn Hiền</p>
              </div>
              <div className='flex justify-between space-x-5'>
                <p className=''>SĐT</p>
                <p className=''>0123456789</p>
              </div>
              <div className='flex justify-between space-x-5'>
                <p className=''>Email</p>
                <p className=''>abc@gmail.com</p>
              </div>
              <div className='flex justify-between space-x-5'>
                <p className=''>Địa chỉ giao hàng</p>
                <p className='max-w-sm'>Số 24 Nguyễn Thái Bình, P.Nguyễn Thái Bình, Q.1, Tp.Hồ Chí Minh</p>
              </div>

            </div>
            <div className='border rounded-md p-2 space-y-4 shadow-md'>
              <div className='flex justify-between space-x-5'>
                  <p className=''>Số lượng sản phẩm</p>
                  <p className=''>4</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Tổng tiền</p>
                  <p className=''>400.000 VNĐ</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Vận chuyển</p>
                  <p className=''>20.000 VNĐ</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Mã giảm giá: ABCDF</p>
                  <p className='max-w-sm'>10.000 VNĐ</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Tổng giá trị đơn hàng</p>
                  <p className='max-w-sm'>10.000 VNĐ</p>
                </div>
              </div>
            </div>
          <div className='col-span-7/12 flex flex-col justify-between border rounded-md p-2 shadow-md'>
            <div>
              <table className="table-fixed w-full ">
                <thead className='border-b-8 border-white text-xl'>
                  <tr>
                    <th className="w-1/8 ...">Sản phẩm</th>
                    <th className="w-1/8 ...">Số lượng</th>
                    <th className="w-1/8 ...">Giá</th>
                    <th className="w-1/8 ...">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-center'>
                    <td>Chuông giáng sinh</td>
                    <td className='py-2'>1</td>
                    <td>200.000 VNĐ</td>
                    <td>200.000 VNĐ</td>
                  </tr>
                  <tr className='text-center'>
                    <td>Chuông giáng sinh</td>
                    <td className='py-2'>1</td>
                    <td>200.000 VNĐ</td>
                    <td>200.000 VNĐ</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div className='border-t-2 space-y-4 pt-3'>
                <div className='flex space-x-5'>
                  <p className=''>Yêu cầu gói quà:</p>
                  <p className=''>Có</p>
                  <div className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>Thông tin</div>
                </div>
                <div className='flex space-x-5'>
                  <p className=''>Mã đơn hàng:</p>
                  <p className=''>MT08</p>
                </div>
                <div className='flex space-x-5'>
                  <p>Trạng thái đơn hàng:</p>
                  <p>Chờ xác nhận</p>
                </div>
                <div className='flex space-x-5'>
                  <p className=''>Yêu cầu trả hàng:</p>
                  <p className='max-w-sm'>Có - Chưa xác nhận</p>
                  <div className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>Thông tin</div>
                </div>
            </div>
          </div>
        </div>
        <div className='max-w-3xl mx-auto mt-10'>
          <div className='flex justify-center space-x-10 sm:space-x-40 '>
            <button type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Hủy đơn hàng</button>
            <button type="button" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Gửi khiếu nại</button>
            
          </div>
        </div>

      </div>
    </div>
  );
});

export default DetailOrders;
