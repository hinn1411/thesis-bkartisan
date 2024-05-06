import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { useParams } from 'react-router-dom';
import { useQueryOrderDetail } from './Hooks/useQuery';
import DetailLoading from './Components/DetailLoading';
import { IOrderProduct } from '../../../apis/apiOrders';


const DetailOrders: FC = memo(() => {
  const { orderId } = useParams<{ orderId: string }>();
  let id: number = 0;
  if(orderId) {
    id = parseInt(orderId)
  }

  // const queryKey = "orderDetail" + orderId;

  const { data, isSuccess, isFetching } = useQueryOrderDetail(id);

  if(isFetching) return null;

  const user = data?.buyer;
  const order = data?.order;
  const orderProduct = data?.orderProduct;

  const totalPrice: number = orderProduct.reduce((total: number, product: IOrderProduct) => {
    return total + (product.price * product.quantity);
  }, 0);

  const totalProduct: number = orderProduct.reduce((total: number, product: IOrderProduct) => {
    return total + product.quantity;
  }, 0);

  


  return (
    <div>
      <SellerSideBar name = "ManageOrders"></SellerSideBar>
      {isFetching && (
        <DetailLoading/>
      )}
      {isSuccess && !isFetching && (
        <div id={`${order.orderId}`} className="p-4 sm:ml-64 mt-16">
        <div className='grid grid-cols-2 gap-x-3' style={{ gridTemplateColumns: '45% 55%' }}>
          <div className='col-span-5/12 space-y-3'>
            <div className='border rounded-md p-4 space-y-3 shadow-md'>
              <p className='border-b-2 border-gray-300 text-xl pb-2'>Thông tin khách hàng</p>
              <div className='flex justify-between space-x-5'>
                <p className=''>Tên</p>
                <p className=''>{user.name}</p>
              </div>
              <div className='flex justify-between space-x-5'>
                <p className=''>SĐT</p>
                <p className=''>{user.numPhone}</p>
              </div>
              <div className='flex justify-between space-x-5'>
                <p className=''>Email</p>
                <p className=''>{user.email}</p>
              </div>
              <div className='flex justify-between space-x-5'>
                <p className=''>Địa chỉ giao hàng</p>
                <p className='max-w-sm'>{user.address}</p>
              </div>

            </div>
            <div className='border rounded-md p-4 space-y-4 shadow-md'>
              <div className='flex justify-between space-x-5'>
                  <p className=''>Số lượng sản phẩm</p>
                  <p className=''>{totalProduct}</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Tổng tiền</p>
                  <p className=''>{totalPrice} VNĐ</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Vận chuyển</p>
                  <p className=''>{order.shipPrice} VNĐ</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Mã giảm giá</p>
                  <p className='max-w-sm'>{order.discountPrice} VNĐ</p>
                </div>
                <div className='flex justify-between space-x-5'>
                  <p className=''>Tổng giá trị đơn hàng</p>
                  <p className='max-w-sm'>{order.totalPrice} VNĐ</p>
                </div>
              </div>
            </div>
          <div className='col-span-7/12 flex flex-col justify-between border rounded-md p-4 shadow-md'>
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
                  {orderProduct.map((product: IOrderProduct) => (
                    <tr key={product.productId} id={`${product.productId}`} className='text-center hover:bg-gray-300'>
                      <td className='truncate'>{product.name}</td>
                      <td className='py-2'>{product.quantity}</td>
                      <td>{product.price} VNĐ</td>
                      <td>{product.price * product.quantity} VNĐ</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            <div className='border-t-2 space-y-4 pt-3'>
                <div className='flex space-x-5'>
                  <p className=''>Yêu cầu gói quà:</p>
                  <p className=''>{order.isGift ? 'Có' : 'Không'}</p>
                  <div className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>Thông tin</div>
                </div>
                <div className='flex space-x-5'>
                  <p className=''>Mã đơn hàng:</p>
                  <p className=''>{order.orderId}</p>
                </div>
                <div className='flex space-x-5'>
                  <p>Trạng thái đơn hàng:</p>
                  <p>{order.status}</p>
                </div>
                <div className='flex space-x-5'>
                  <p className=''>Yêu cầu trả hàng:</p>
                  <p className='max-w-sm'>{order.isReturn ? 'Có' : 'Không'}</p>
                  {order.isReturn ? (<div className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>Thông tin</div>) : ('')}
                </div>
            </div>
          </div>
        </div>
        <div className='max-w-full mx-auto mt-10'>

            <button type="button" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Gửi khiếu nại</button>
            
   
        </div>

      </div>
      )}
      
    </div>
  );
});

export default DetailOrders;
