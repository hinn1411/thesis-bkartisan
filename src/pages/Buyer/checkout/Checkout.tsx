import { Checkbox, Label, Table } from 'flowbite-react';
import { FC, memo } from 'react';
import { useFetchOrder } from './hooks/useFetchOrder';
import Spinner from '@components/common/ui/Spinner';
import ItemRow from './components/ItemRow';
import Button from '@components/common/button/Button';
import { formatCurrency } from '@utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';
import { usePayment } from './hooks/usePayment';
import TextInput from '@components/common/input/TextInput';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressSchema } from './shippingAddressSchema';

export interface CheckoutProps {}
type ShippingAddress = z.infer<typeof shippingAddressSchema>;
const Checkout: FC<CheckoutProps> = memo(() => {
  const { order, isFetching } = useFetchOrder();
  const { goToPaymentGateway } = usePayment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
  });
  if (isFetching) {
    return (
      <div className="min-h-screen px-4 md:px-52 my-5 ">
        <Spinner />
      </div>
    );
  }
  const orderPrice = order.orderInfo.totalPrice;
  const discountPrice = order.discountInfo.totalDiscount;
  const formattedDiscount = formatCurrency(
    discountPrice,
    CURRENCIES.VIETNAMDONG
  );
  const finalPrice = formatCurrency(
    orderPrice - discountPrice,
    CURRENCIES.VIETNAMDONG
  );
  const handleCheckout = () => {
    goToPaymentGateway();
  };
  return (
    <div className="min-h-screen px-4 md:px-52 my-5 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Thanh toán</h1>
      {/* Thong tin giao hang */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">Địa chỉ giao hàng</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="text-orange-600  focus:ring-orange-600"
            id="address"
          />
          <Label htmlFor="address">Sử dụng địa chỉ cá nhân</Label>
        </div>
        <form className="space-y-3">
          <div className="flex space-x-8">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Tên người nhận
              </label>
              <TextInput
                label="Nhập tên người nhận"
                type="text"
                placeholder="Nhập tỉnh/thành phố"
                register={register}
                errors={errors}
                validatedObject={{}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <TextInput
                label="Nhập số điện thoại"
                type="text"
                placeholder="Nhập số điện thoại"
                register={register}
                errors={errors}
                validatedObject={{}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className='flex space-x-3 items-center'>
            <p className="block text-sm font-medium text-gray-900 ">
              Địa chỉ: 268 Lý Thường Kiệt, Q.10, TP.HCM
            </p>
            <p className='underline cursor-pointer'>Thay đổi</p>
          </div>
        </form>
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
              <Table.Cell className="font-semibold text-black">
                Mã giảm giá
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>-{formattedDiscount}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell></Table.Cell>
              <Table.Cell className="font-semibold text-black">
                Phí vận chuyển
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>-{0}đ</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell></Table.Cell>
              <Table.Cell className="font-semibold text-black">
                Tổng tiền
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{finalPrice}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Button className="flex justify-center items-center py-3 space-x-2 font-sans font-bold text-orange-600 rounded-md px-6 bg-white shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border border-orange-600">
            Mua sau
          </Button>
          <Button
            onClick={handleCheckout}
            className="flex justify-center items-center py-3 space-x-2 font-sans font-bold text-white rounded-md px-6 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
          >
            Xác nhận
          </Button>
        </div>
      </section>
    </div>
  );
});

export default Checkout;
