import {
  Fragment,
  useRef,
  FC,
  memo,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

// Styles
import styles from "./GiftDetailModal.module.css";
// Components
import HorizontalDivider from "@components/common/divider/HorizontalDivider";
import GiftComponent from "./GiftComponent";
import TextInput from "@components/common/input/TextInput";
import { useForm } from "react-hook-form";
import { Checkbox, Label } from "flowbite-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressChema } from "./AddressSchema";
import { useUserProfile } from "@hooks/useUserProfile";
import { useFetchCountries } from "@hooks/useFetchCountries";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import ProductComponent from "./ProductComponent";
import { onChange } from "node_modules/react-toastify/dist/core/store";
export type GiftDetailModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  setIsDone: Dispatch<boolean>;
  items: any;
  box: any;
  card: any;
  setItems: Dispatch<any>;
  transports: any;
};

export type Address = z.infer<typeof AddressChema>;

const GiftDetailModal: FC<GiftDetailModalProps> = memo(
  ({
    isOpen,
    setIsOpen,
    setIsDone,
    items,
    card,
    box,
    setItems,
    transports,
  }) => {
    const { user } = useUserProfile();
    const {
      register,
      setValue,
      reset,
      watch,
      getValues,
      formState: { errors },
    } = useForm<Address>({
      resolver: zodResolver(AddressChema),
    });
    const [isUsedDefaultAddress, setIsUsedDefaultAddress] = useState(false);
    const [shippingObject, setShippingObject] = useState({
      price: 0,
      pricePerItem: 0,
    });
    const { countries } = useFetchCountries();
    const { onNationChange } = register("nation");
    const cancelButtonRef = useRef(null);
    const totalBill =
      (box[0]?.price || 0) +
      (card[0]?.price || 0) +
      (Object.values(items).reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ) || 0);
    const formattedTotalBill = formatCurrency(
      totalBill,
      CURRENCIES.VIETNAMDONG
    );
    const totalQuantity =
      box.length +
      card.length +
      (Object.values(items).reduce((acc, item) => acc + item.quantity, 0) || 0);

    const [shippingCost, setShippingCost] = useState(0);
    useEffect(() => {
      if (totalQuantity === 0) {
        setShippingCost(0);
      } else if (totalQuantity === 1) {
        setShippingCost(shippingObject.price);
      } else {
        setShippingCost(
          shippingObject.price +
            (totalQuantity - 1) * shippingObject.pricePerItem
        );
      }
    }, [totalQuantity, shippingObject, setShippingCost]);
    const formattedShippingPrice = formatCurrency(
      shippingCost,
      CURRENCIES.VIETNAMDONG
    );
    const formattedTotalPrice = formatCurrency(
      shippingCost + totalBill,
      CURRENCIES.VIETNAMDONG
    );
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
      }
      setIsUsedDefaultAddress((prev) => !prev);
    };
    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl ">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex justify-center">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 ">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold leading-6 text-gray-900 divide-y"
                        >
                          Xem trước gói quà
                        </Dialog.Title>
                        {/* <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Bạn có muốn xóa sản phẩm này không?
                        </p>
                      </div> */}
                      </div>
                    </div>
                    <HorizontalDivider />
                    {/* Outer container  */}
                    <div>
                      <p className={`${styles.item}`}>Hộp quà</p>
                      {/* Inner container */}
                      {box.map((box) => (
                        <GiftComponent key={box} {...box} />
                      ))}
                      {/* <GiftComponent {...giftBoxData} /> */}
                    </div>
                    <HorizontalDivider />
                    <div>
                      <p className={`${styles.item}`}>Quà tặng</p>
                      <ul className="space-y-1">
                        {Object.values(items).map((item) => (
                          <ProductComponent
                            setItems={setItems}
                            key={item}
                            {...item}
                          />
                        ))}
                      </ul>
                    </div>
                    <HorizontalDivider />
                    <div>
                      <p className={`${styles.item}`}>Thiệp lời chúc</p>
                      {card.map((card) => (
                        <GiftComponent key={card} {...card} />
                      ))}
                    </div>
                    <HorizontalDivider />
                    <div className="text-end">
                      <p className="text-end">
                        <span className={`${styles.description} `}>
                          Tổng đơn:
                        </span>{" "}
                        <span className={`${styles.price}`}>
                          {formattedTotalBill}
                        </span>
                      </p>
                      <p className="text-end">
                        <span className={`${styles.description}`}>
                          Phí vận chuyển:
                        </span>{" "}
                        <span className={`${styles.price}`}>
                          {formattedShippingPrice}
                        </span>
                      </p>
                      <p className="text-end">
                        <span className={`${styles.description} `}>
                          Tổng tiền:
                        </span>{" "}
                        <span className={`${styles.price}`}>
                          {formattedTotalPrice}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className={`${styles.item}`}>Lời chúc</p>
                        <p className={`${styles.description} italic`}>
                          Hãy dành cho những người thân yêu lời chúc thật ý
                          nghĩa
                        </p>
                      </div>

                      <textarea
                        className={`w-full resize rounded-md focus:outline-none border-orange-600 border-2 placeholder:text-[14px]`}
                        placeholder="Nhập lời chúc..."
                      ></textarea>
                    </div>
                    <div className="space-y-1">
                      <section className="space-y-1">
                        <h2 className={`${styles.item}`}>Địa chỉ giao hàng</h2>
                        <span className="flex items-center space-x-2">
                          <Checkbox
                            className="text-orange-600  focus:ring-orange-600"
                            id="address"
                            onClick={setDefaultAddress}
                          />
                          <Label htmlFor="address">
                            Sử dụng địa chỉ cá nhân
                          </Label>
                        </span>
                        <form className="space-y-3">
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
                                    const newNation = e.target.value;
                                    console.log(`nation = ${newNation}`);

                                    setValue("nation", newNation);
                                    console.log(transports);

                                    const [newNationObject] = transports.filter(
                                      (item) => item.location == newNation
                                    );
                                    if (newNationObject) {
                                      setShippingObject({
                                        price: newNationObject.price,
                                        pricePerItem:
                                          newNationObject.pricePerItem,
                                      });
                                    }
                                    console.log(newNationObject);
                                  }}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                  <option value="" selected>
                                    Chọn quốc gia
                                  </option>
                                  {countries &&
                                    countries.map(
                                      (country: string, index: number) => (
                                        <option key={index} value={country}>
                                          {country}
                                        </option>
                                      )
                                    )}
                                </select>
                                {errors.nation && (
                                  <p className="text-sm text-red-500">
                                    {errors.nation.message}
                                  </p>
                                )}
                              </div>
                              {/* <label
                                htmlFor="nation"
                                className="block mb-1 text-sm font-medium text-gray-900 "
                              >
                                Quốc gia
                              </label>
                              <TextInput
                                label="nation"
                                type="text"
                                placeholder="Nhập tên người nhận hàng"
                                register={register}
                                errors={errors}
                                validatedObject={{}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              /> */}
                            </div>
                            {/* Address */}
                            <div className="flex-[2]">
                              <label
                                htmlFor="address"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Địa chỉ
                              </label>
                              <TextInput
                                label="address"
                                type="text"
                                placeholder="Nhập số điện thoại"
                                register={register}
                                errors={errors}
                                validatedObject={{}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </form>
                      </section>
                    </div>
                  </div>

                  {/* Button container */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
                    >
                      Đồng ý
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
);

export default GiftDetailModal;
