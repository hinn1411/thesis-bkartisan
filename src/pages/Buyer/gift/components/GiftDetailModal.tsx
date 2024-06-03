import { Fragment, useRef, FC, memo, Dispatch, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// Styles
import styles from "./GiftDetailModal.module.css";
// Components
import HorizontalDivider from "@components/common/divider/HorizontalDivider";
import GiftComponent from "./GiftComponent";
import { z } from "zod";
import { AddressChema } from "./AddressSchema";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import ProductComponent from "./ProductComponent";
import _ from "lodash";
import { useUINotification } from "../hooks/useUINotification";
import { useCreateGift } from "../hooks/useMutateGift";
export type GiftDetailModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  setIsDone: Dispatch<boolean>;
  items: any;
  box: any;
  card: any;
  setItems: Dispatch<any>;
  setCard: Dispatch<any>;
  setBox: Dispatch<any>;
};

export type Address = z.infer<typeof AddressChema>;

const GiftDetailModal: FC<GiftDetailModalProps> = memo(
  ({ isOpen, setIsOpen, items, card, box, setItems, setBox, setCard }) => {
    const { warn } = useUINotification();
    const { createGift } = useCreateGift();
    const [wish, setWish] = useState<string>("");
    const cancelButtonRef = useRef(null);
    const totalBill =
      (box[0]?.price || 0) +
      (card[0]?.price || 0) +
      (Object.values(items).reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ) || 0);
    // const formattedTotalBill = formatCurrency(
    //   totalBill,
    //   CURRENCIES.VIETNAMDONG
    // );

    // const formattedShippingPrice = formatCurrency(
    //   shippingCost,
    //   CURRENCIES.VIETNAMDONG
    // );
    const formattedTotalPrice = formatCurrency(
      totalBill,
      CURRENCIES.VIETNAMDONG
    );
    const handleSubmit = async () => {
      if (_.isEqual(items, {})) {
        return warn("Vui lòng chọn quà");
      }
      if (_.isEqual(card, [])) {
        return warn("Vui lòng chọn thiệp lời chúc");
      }
      if (_.isEqual(box, [])) {
        return warn("Vui lòng chọn hộp quà");
      }

      console.log(`gather data`);
      console.log(`items`, Object.values(items));
      console.log(`card`, card);
      console.log(`box`, box);
      return await new Promise(() =>
        createGift({
          items: Object.values(items),
          box: box[0],
          card: { ...card[0], note: wish },
        })
      ).then(() => {
        setIsOpen(false);
      });
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
                        <GiftComponent key={box} {...box} setItem={setBox} />
                      ))}
                      {/* <GiftComponent {...giftBoxData} /> */}
                    </div>
                    <HorizontalDivider />
                    <div>
                      <p className={`${styles.item}`}>Quà tặng</p>
                      <ul className="space-y-1">
                        {Object.values(items).map((item, index) => (
                          <ProductComponent
                            setItems={setItems}
                            key={index}
                            {...item}
                          />
                        ))}
                      </ul>
                    </div>
                    <HorizontalDivider />
                    <div>
                      <p className={`${styles.item}`}>Thiệp lời chúc</p>
                      {card.map((card) => (
                        <GiftComponent key={card} {...card} setItem={setCard} />
                      ))}
                    </div>
                    <HorizontalDivider />

                    <p className="text-center">
                      <span className={`${styles.description} `}>
                        Tổng tiền:
                      </span>{" "}
                      <span className={`${styles.price}`}>
                        {formattedTotalPrice}
                      </span>
                    </p>

                    <div className="space-y-2">
                      <div>
                        <p className={`${styles.item}`}>Lời chúc</p>
                        <p className={`${styles.description} italic`}>
                          Hãy dành cho những người thân yêu lời chúc thật ý
                          nghĩa
                        </p>
                      </div>

                      <textarea
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                        className={`w-full resize rounded-md focus:outline-none border-orange-600 border-2 placeholder:text-[14px]`}
                        placeholder="Nhập lời chúc..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Button container */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={handleSubmit}
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
