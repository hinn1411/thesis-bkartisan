import { Dispatch, FC, Fragment, memo, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HorizontalDivider from "@components/common/divider/HorizontalDivider";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import GiftElement from "./GiftElement";

export interface GiftDetailsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  setIsDone: Dispatch<boolean>;
  items: any;
  box: any;
  card: any;
}

const GiftDetails: FC<GiftDetailsProps> = memo(
  ({ isOpen, setIsOpen, items, box, card }) => {
    const cancelButtonRef = useRef(null);
    const totalBill =
      (box[0]?.price * (1 - box[0]?.discount / 100) || 0) +
      (card[0]?.price * (1 - card[0]?.discount / 100) || 0) +
      (Object.values(items).reduce(
        (acc, item) =>
          acc + item.quantity * item.price * (1 - item.discount / 100),
        0
      ) || 0);
    const formattedTotalPrice = formatCurrency(
      totalBill,
      CURRENCIES.VIETNAMDONG
    );
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
                          Chi tiết quà
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
                      <p className={`font-semibold`}>Hộp quà</p>
                      {/* Inner container */}
                      {box.map((box) => (
                        <GiftElement key={box} {...box} />
                      ))}
                      {/* <GiftComponent {...giftBoxData} /> */}
                    </div>
                    <HorizontalDivider />
                    <div>
                      <p className={`font-semibold`}>Quà tặng</p>
                      <ul className="space-y-1">
                        {Object.values(items).map((item) => (
                          <GiftElement key={item} {...item} />
                        ))}
                      </ul>
                    </div>
                    <HorizontalDivider />
                    <div>
                      <p className={`font-semibold`}>Thiệp lời chúc</p>
                      {card.map((card) => (
                        <GiftElement key={card} {...card} />
                      ))}
                    </div>
                    <HorizontalDivider />

                    <p className="text-center">
                      <span className={` `}>Tổng tiền:</span>{" "}
                      <span className={``}>{formattedTotalPrice}</span>
                    </p>

                    <div className="space-y-2">
                      <p className="font-semibold">Lời chúc</p>
                      <textarea
                        value={"gi cung dc"}
                        disabled
                        className={`w-full resize bg-slate-100 rounded-md focus:outline-none placeholder:text-[14px]`}
                        placeholder="Nhập lời chúc..."
                      ></textarea>
                    </div>
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

export default GiftDetails;
