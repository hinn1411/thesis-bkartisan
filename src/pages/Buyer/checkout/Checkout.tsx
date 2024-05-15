import { Checkbox, Label, Table } from 'flowbite-react';
import { FC, memo } from 'react';
import { useFetchOrder } from './hooks/useFetchOrder';
import Spinner from '@components/common/ui/Spinner';
import ItemRow from './components/ItemRow';
import Button from '@components/common/button/Button';

export interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = memo(() => {
  const { order, isFetching } = useFetchOrder();
  if (isFetching) {
    return (
      <div className="min-h-screen px-4 md:px-52 my-5 ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-52 my-5 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Thanh toán</h1>
      {/* Thong tin giao hang */}
      <section>
        <h2 className="text-xl font-medium">Địa chỉ giao hàng</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="text-orange-600  focus:ring-orange-600"
            id="remember"
          />
          <Label htmlFor="remember">Sử dụng địa chỉ cá nhân</Label>
        </div>
      </section>
      {/* Thong tin don hang */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">Thông tin đơn hàng</h2>

        <Table>
          <Table.Head className="text-md normal-case text-black">
            <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
            <Table.HeadCell>Đơn giá</Table.HeadCell>
            <Table.HeadCell>Số lượng</Table.HeadCell>
            <Table.HeadCell>Thành tiền</Table.HeadCell>
            {/* <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell> */}
          </Table.Head>
          <Table.Body className="divide-y">
            {order.orderItems.map((item: any, index: number) => (
              <ItemRow key={index} {...item} />
            ))}
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell></Table.Cell>
              <Table.Cell className='font-semibold text-black'>Mã giảm giá</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>-100.000đ</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div className='flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0'>
          <Button className="flex justify-center items-center py-3 space-x-2 font-sans font-bold text-orange-600 rounded-md px-6 bg-white shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border border-orange-600">
            Mua sau
          </Button>
          <Button className="flex justify-center items-center py-3 space-x-2 font-sans font-bold text-white rounded-md px-6 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
            Xác nhận
          </Button>
        </div>
      </section>
    </div>
  );
});

export default Checkout;
