import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuerySellerOrderDetail } from './Hooks/useQuery';
import DetailLoading from '@components/seller/DetailLoading';
import { useChangeOrderState } from './Hooks/userMutation';
import { ModalGiftInfo } from './Components/ModalGift';
import { ModalReturnInfo } from './Components/ModalReturn';

interface IOrderProduct {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}

const DetailOrders: FC = memo(() => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const {changeState} = useChangeOrderState()

  const { data: order, isSuccess, isFetching, refetch } = useQuerySellerOrderDetail(orderId ? orderId : "");

  let totalQuantity = 0;
  let totalPrice = 0;

  if (order && order.orderProduct) {
    totalQuantity = order.orderProduct.reduce((acc: number, item: IOrderProduct) => acc + item.quantity, 0);
    totalPrice = order.orderProduct.reduce((acc: number, item: IOrderProduct) => acc + (item.price * item.quantity), 0);
  }

  const onChangeState = () => {
    changeState({
      orderId: orderId,
    })
    refetch();
  }

  const [openModalGiftInfo, setOpenModalGiftInfo] = useState(false);
  const [openModalReturnInfo, setOpenModalReturnInfo] = useState(false);

  const ai = "QHDNFTV6PI";

  const id = "YSXWM5SMGG"
  const [state, setState] = useState("Chờ lấy hàng");
  const handleClick = () => {
    // Thiết lập trạng thái mới sau 1 giây
    setTimeout(() => {
      setState("Đang vận chuyển");
    }, 1000);
  };

  return (
    <div>
      <SellerSideBar name = "ManageOrders"></SellerSideBar>
      <div id={`${orderId}`} className="p-4 sm:ml-64 mt-16">
      <ModalGiftInfo openModal={openModalGiftInfo} setOpenModal={setOpenModalGiftInfo}/>
      <ModalReturnInfo openModal={openModalReturnInfo} setOpenModal={setOpenModalReturnInfo}/>
        {(isFetching) && (
          <DetailLoading></DetailLoading>
        )}
        {
          (isSuccess && !isFetching) && (
            <div>
              <div className='grid grid-cols-2 gap-x-3' style={{ gridTemplateColumns: '45% 55%' }}>
                <div className='col-span-5/12 space-y-3'>
                  <div className='border rounded-md p-4 space-y-3 shadow-md'>
                    <p className='border-b-2 border-gray-300 text-xl pb-2'>Thông tin khách hàng</p>
                    <div className='flex justify-between space-x-5'>
                      <p className=''>Tên</p>
                      <p className=''>{order.buyer.name}</p>
                    </div>
                    <div className='flex justify-between space-x-5'>
                      <p className=''>SĐT</p>
                      <p className=''>{order.buyer.numPhone}</p>
                    </div>
                    <div className='flex justify-between space-x-5'>
                      <p className=''>Email</p>
                      <p className=''>{order.buyer.email}</p>
                    </div>
                    <div className='flex justify-between space-x-5'>
                      <p className=''>Địa chỉ giao hàng</p>
                      <p className='max-w-sm'>{order.buyer.address}</p>
                    </div>

                  </div>
                  <div className='border rounded-md p-4 space-y-4 shadow-md'>
                    <div className='flex justify-between space-x-5'>
                        <p className=''>Số lượng sản phẩm</p>
                        <p className=''>{totalQuantity}</p>
                      </div>
                      <div className='flex justify-between space-x-5'>
                        <p className=''>Tổng tiền sản phẩm</p>
                        <p className=''>{totalPrice} VNĐ</p>
                      </div>
                      <div className='flex justify-between space-x-5'>
                        <p className=''>Vận chuyển</p>
                        <p className=''>{order.order.shipPrice} VNĐ</p>
                      </div>
                      <div className='flex justify-between space-x-5'>
                        <p className=''>Mã giảm giá: </p>
                        <p className='max-w-sm'>{order.order.discountPrice} VNĐ</p>
                      </div>
                      <div className='flex justify-between space-x-5'>
                        <p className=''>Tổng giá trị đơn hàng</p>
                        <p className='max-w-sm'>{order.order.totalPrice} VNĐ</p>
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
                      {order.orderProduct.map((product: IOrderProduct, index: number) => (
                          <tr key={index} className='text-center hover:bg-gray-300'>
                            <td className='py-1 truncate'>{product.name}</td>
                            <td className='py-2'>{product.quantity}</td>
                            <td>{product.price.toLocaleString()} VNĐ</td>
                            <td>{(product.price * product.quantity).toLocaleString()} VNĐ</td>
                          </tr>
                        ))}
                        
                      </tbody>
                    </table>
                  </div>
                  <div className='border-t-2 space-y-4 pt-3'>
                      <div className='flex space-x-5'>
                        <p className=''>Yêu cầu gói quà:</p>
                        {/* <p className=''>{order.order.hasGift ? 'Có' : 'Không'}</p> */}
                        {
                          order.order.orderId  === "QHDNFTV6PI" ? (<div className='flex space-x-5'>
                            <p className=''>Có</p>
                        {/* {order.order.hasGift ? ( */}
                          <div onClick={() => setOpenModalGiftInfo(true)} className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>Thông tin</div>
                        {/* ) : null} */}
                          </div>) : (<p className=''>Không</p>)}
                        
                        
                        
                      </div>
                      <div className='flex space-x-5'>
                        <p className=''>Mã đơn hàng:</p>
                        <p className=''>{order.order.orderId}</p>
                      </div>
                      <div className='flex space-x-5'>
                        <p>Trạng thái đơn hàng:</p>
                        {
                          order.order.orderId != id && (
                            <div className='flex space-x-5'>
                              <p>{order.order.status}</p>
                              <div onClick={onChangeState} className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>
                                Đổi trạng thái
                              </div>
                            </div>
                          )
                        }
                        {
                          order.order.orderId  === "YSXWM5SMGG" && (
                            <div className='flex space-x-5'>
                              <p>{state}</p>
                              <div onClick={handleClick} className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>
                                Đổi trạng thái
                              </div>
                            </div>
                          )
                        }
                      </div>
                      <div className='flex space-x-5'>
                        <p className=''>Yêu cầu trả hàng:</p>
                        {/* <p className='max-w-sm'>{order.order.isReturn ? 'Có - Chưa xác nhận' : 'Không'}</p> */}
                        <p className='max-w-sm'>{order.order.orderId === "QHDNFTV6PI" ? "Có" : "Không"}</p>
                        {/* { order.order.isReturn ? ( */}
                        { order.order.orderId === "QHDNFTV6PI" ? (
                          <div onClick={() => setOpenModalReturnInfo(true)} className='h-auto w-auto px-2 bg-blue-100 hover:bg-blue-300 border rounded-lg border-blue-700 cursor-pointer'>Thông tin</div>
                         ) : null}
                      </div>
                  </div>
                </div>
              </div>
              <div className='max-w-3xl mx-auto mt-10'>
                <div className='flex justify-center space-x-10 sm:space-x-40 '>
                  <button onClick={() =>
                      navigate("/seller/message", { state: { username: order.buyer.username, name: order.buyer.name, avatar: order.buyer.avatar } })
                    } type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Chat với người mua</button>
                  <button type="button" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Khiếu nại</button>
                  
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
});

export default DetailOrders;
