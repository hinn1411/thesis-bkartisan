import { Checkbox, Label } from "flowbite-react";
import { FC, memo, useState } from "react";
import { useFetchCheckoutOrder } from "./hooks/useFetchCheckoutOrder";
import Spinner from "@components/common/ui/Spinner";
import Button from "@components/common/button/Button";
import { usePayment } from "./hooks/usePayment";
import TextInput from "@components/common/input/TextInput";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderTable, { OrderTableProps } from "./components/OrderTable";
import BuyLaterModal from "./components/BuyLaterModal";
import { useSaveOrder } from "./hooks/useSaveOrder";
import { AddressSchema } from "./AddressSchema";
import { useFetchCountries } from "@hooks/useFetchCountries";
import { useUserProfile } from "@hooks/useUserProfile";

export interface CheckoutProps {}
type Address = z.infer<typeof AddressSchema>;
const Checkout: FC<CheckoutProps> = memo(() => {
  const [isUsedDefaultAddress, setIsUsedDefaultAddress] = useState(false);
  const { countries } = useFetchCountries();
  const { user } = useUserProfile();
  const { isOpenBuyLaterModal, setIsOpenBuyLaterModal } = useSaveOrder();
  const { data, isFetching } = useFetchCheckoutOrder();
  const { goToPaymentGateway } = usePayment();
  const {
    register,
    setValue,
    reset,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(AddressSchema),
  });
  if (isFetching) {
    return (
      <div className="min-h-screen px-4 md:px-52 my-5 ">
        <Spinner />
      </div>
    );
  }
  const { orderPrice, discountPrice } = data.orderInfo;
  const setDefaultAddress = () => {
    if (!user) {
      return;
    }
    if (isUsedDefaultAddress) {
      reset();
    } else {
      setValue("address", user.address);
      setValue("nation", user.nation);
      setValue("name", user.name);
      setValue("numPhone", user.numPhone);
      clearErrors();
    }
    setIsUsedDefaultAddress((prev) => !prev);
  };

  const handleCheckout = () => {
    const address = getValues();
    console.log(address);
    
    // alert(`address is valid`);
    goToPaymentGateway(address);
  };
  return (
    <form
      onSubmit={handleSubmit(handleCheckout)}
      className="min-h-screen px-4 md:px-52 my-5 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-center">Thông tin đơn hàng</h1>
      {/* Thong tin giao hang */}
      <section className="space-y-4 w-full md:max-w-xl">
        <h2>Địa chỉ giao hàng</h2>
        <span className="flex items-center space-x-2">
          <Checkbox
            className="text-orange-600  focus:ring-orange-600"
            id="address"
            onClick={setDefaultAddress}
          />
          <Label htmlFor="address">Sử dụng địa chỉ cá nhân</Label>
        </span>
        <div className="space-y-3">
          <div className="flex space-x-8">
            {/* Receiver */}
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Tên người nhận
              </label>
              <TextInput
                label="name"
                type="text"
                placeholder="Nhập tên người nhận hàng"
                register={register}
                errors={errors}
                validatedObject={{}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {/* Phone */}
            <div className="flex-1">
              <label
                htmlFor="numPhone"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <TextInput
                label="numPhone"
                type="text"
                placeholder="Nhập số điện thoại"
                register={register}
                errors={errors}
                validatedObject={{}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-8">
            {/* Nation */}
            <div className="flex-1">
              <div className="">
                <label
                  htmlFor="nation"
                  className="block mb-1 text-sm font-medium text-gray-900 "
                >
                  Chọn quốc gia
                </label>
                <select
                  id="nation"
                  {...register("nation")}
                  onChange={(e) => {
                    // const newNation = e.target.value;
                    // console.log(`nation = ${newNation}`);
                    // setValue("nation", newNation);
                    // console.log(transports);
                    // const [newNationObject] = transports.filter(
                    //   (item) => item.location == newNation
                    // );
                    // if (newNationObject) {
                    //   setShippingObject({
                    //     price: newNationObject.price,
                    //     pricePerItem: newNationObject.pricePerItem,
                    //   });
                    // }
                    // console.log(newNationObject);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" selected>
                    Chọn quốc gia
                  </option>
                  {countries &&
                    countries.map((country: string, index: number) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                </select>
                {errors.nation && (
                  <p className="text-sm text-red-500">
                    {errors.nation.message}
                  </p>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="flex-1">
              <label
                htmlFor="address"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ
              </label>
              <TextInput
                label="address"
                type="text"
                placeholder="Nhập địa chỉ giao hàng"
                register={register}
                errors={errors}
                validatedObject={{}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Thong tin don hang */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">Thông tin sản phẩm</h2>

        {data.orders.map((order: OrderTableProps, index: number) => (
          <OrderTable info={data?.orderInfo} key={index} {...order} />
        ))}
        {/* <Table>
          <Table.Head className="text-md normal-case text-black">
            <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
            <Table.HeadCell>Đơn giá</Table.HeadCell>
            <Table.HeadCell>Số lượng</Table.HeadCell>
            <Table.HeadCell>Thành tiền</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
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
        </Table> */}
        <BuyLaterModal
          isOpen={isOpenBuyLaterModal}
          setIsOpen={setIsOpenBuyLaterModal}
        />
        <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Button
            onClick={() => setIsOpenBuyLaterModal((prev) => !prev)}
            className="flex justify-center items-center py-3 space-x-2 font-sans font-bold text-orange-600 rounded-md px-6 bg-white shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border border-orange-600"
          >
            Mua sau
          </Button>
          <Button
            // onClick={handleCheckout}
            className="flex justify-center items-center py-3 space-x-2 font-sans font-bold text-white rounded-md px-6 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
          >
            Xác nhận
          </Button>
        </div>
      </section>
    </form>
  );
});

export default Checkout;
