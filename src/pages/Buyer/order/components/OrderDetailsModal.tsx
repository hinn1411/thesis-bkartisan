import { Fragment, useRef, FC, memo, Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { OrderItemProps } from "./OrderItem";
import Item, { ItemProps } from "./Item";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";

export type OrderDetailsModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  data: OrderItemProps;
};

const OrderDetailsModal: FC<OrderDetailsModalProps> = memo(
  ({ isOpen, setIsOpen, data }) => {
    const cancelButtonRef = useRef(null);

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-sans font-bold text-center leading-6 text-gray-900"
                        >
                          Thông tin đơn hàng
                        </Dialog.Title>
                        <Dialog.Description className="space-y-3 mt-2">
                          <div className="flex justify-between text-sm opacity-90 ">
                            <p>
                              Phương thức thanh toán:{" "}
                              <span className="uppercase">
                                {data.paymentMethod}
                              </span>{" "}
                            </p>
                            <p>
                              Ngày đặt hàng: <span>{data.createAt}</span>
                            </p>
                          </div>
                          {/* Address */}
                          <div className="pb-4 border-b-2 border-b-gray-300">
                            <h1 className="text-lg font-sans font-semibold">
                              Thông tin nhận hàng
                            </h1>
                            <p className="text-sm">
                              <span className="font-semibold">Người nhận</span>:
                              Giang Tuấn Hiền
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Địa chỉ</span>: Ký
                              túc xá khu A: Đường Tạ Quang Bửu, Khu phố 6,
                              Phường Linh Trung, Thành phố Thủ Đức, Thành phố Hồ
                              Chí Minh.
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Điện thoại</span>:
                              0345 755 751
                            </p>
                          </div>
                          {/* Items */}
                          <div>
                            <p className="font-sans text-lg font-semibold my-3">
                              Sản phẩm
                            </p>

                            <ul className="space-y-4 pb-6 border-b-2 border-b-gray-300">
                              {data.items.map(
                                (item: ItemProps, index: number) => (
                                  <Item key={index} {...item} />
                                )
                              )}
                            </ul>
                          </div>
                          {/* Bill */}
                          <div className="flex flex-col items-end text-sm">
                            <p>
                              <span>Tổng đơn hàng:</span>{" "}
                              <span className="text-orange-600">
                                {formatCurrency(
                                  data.totalPrice,
                                  CURRENCIES.VIETNAMDONG
                                )}
                              </span>
                            </p>
                            <p>
                              <span>Giảm giá:</span>{" "}
                              <span className="text-orange-600">
                                {formatCurrency(
                                  data.discountPrice,
                                  CURRENCIES.VIETNAMDONG
                                )}
                              </span>
                            </p>
                            {/* <p>Tổng phụ: 123,000đ</p> */}
                            {/* <p>
                              Phí vận chuyển:{" "}
                              <span className="text-orange-600">
                                {formatCurrency(
                                  data.shipPrice,
                                  CURRENCIES.VIETNAMDONG
                                )}
                              </span>
                            </p> */}
                            <p>
                              Tổng tiền:{" "}
                              <span className="text-orange-600">
                                {formatCurrency(
                                  data.totalPrice -
                                    data.discountPrice +
                                    data.shipPrice,
                                  CURRENCIES.VIETNAMDONG
                                )}
                              </span>
                            </p>
                          </div>
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                  <div className="text-end px-4 py-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      Xác nhận
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

export default OrderDetailsModal;
