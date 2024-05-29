import { memo, FC, useState, Fragment } from "react";
import Stepper from "./components/Stepper";
import { GiftOutlined } from "@ant-design/icons";
import GiftDetailModal from "./components/GiftDetailModal.js";
import SuccessfulModal from "./components/SuccessfulModal.js";
import { useProductPagination } from "../home/hooks/useProductPagination.js";
import ProductList from "@components/common/product/ProductList.js";
import Pagination from "@components/common/pagination/Pagination.js";
import { useParams } from "react-router-dom";
import useFetchShopInformation from "src/pages/Seller/Shop/hooks/useFetchShopInformation.js";
import GiftList from "./components/GiftList.js";
import { ToastOptions, toast } from "react-toastify";
import { Message } from "@components/common/toast/Message.js";
import { SuccessIcon } from "@components/common/toast/SuccessIcon.js";
import { options } from "@components/common/toast/options.js";
import Spinner from "@components/common/ui/Spinner.js";
/* 
  Remember adding loading indicator for item list
*/
const Gift: FC = memo(() => {
  const { seller } = useParams();
  const { shop, isLoading } = useFetchShopInformation(seller as string);
  console.log(shop);

  const [current, setCurrent] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpenedGiftDetailModal, setIsOpenedGiftDetailModal] = useState(false);
  const [isDone, setIsDone] = useState(false);
  // const { data: products, page, setPage, isFetching } = useProductPagination();
  const [giftItems, setGiftItems] = useState({});
  const [giftCard, setGiftCard] = useState([]);
  const [giftBox, setGiftBox] = useState([]);

  const addItems = (newItem) => {
    setGiftItems((items) => {
      if (!items[newItem.giftId]) {
        return {
          ...items,
          [newItem.giftId]: {
            ...newItem,
            quantity: 1,
          },
        };
      } else {
        return {
          ...items,
          [newItem.giftId]: {
            ...newItem,
            quantity: items[newItem.giftId].quantity + 1,
          },
        };
      }
    });
    console.log(`giftItems`);

    console.log(giftItems);
    notify("Thêm thành công");
  };
  const addBox = (newBox) => {
    setGiftBox((items) => [newBox]);
    console.log(`giftBox`);
    console.log(giftBox);
    notify("Cập nhật thành công");
  };
  const addCard = (newCard) => {
    setGiftCard((items) => [newCard]);
    notify("Cập nhật thành công");
  };
  const notify = (msg: string) => {
    toast(<Message>{msg}!</Message>, {
      icon: <SuccessIcon />,
      ...(options as ToastOptions),
    });
  };
  if(isLoading) {
    <Spinner />
  }
  return (
    <div className="min-h-screen px-20 my-5 space-y-5">
      <GiftDetailModal
        isOpen={isOpenedGiftDetailModal}
        setIsOpen={setIsOpenedGiftDetailModal}
        setIsDone={setIsDone}
        box={giftBox}
        card={giftCard}
        items={giftItems}
        setItems={setGiftItems}
        transports={shop?.transports}
      />
      <SuccessfulModal isOpen={isDone} setIsOpen={setIsDone} />
      <div className="space-y-1">
        <div className="text-3xl font-medium text-center">Tặng quà</div>
        <div className="flex justify-center items-center space-x-1 hover:cursor-pointer">
          <div
            onClick={() => setIsOpenedGiftDetailModal(true)}
            className="text-center"
          >
            Xem trước quà tặng
          </div>
          <GiftOutlined
            size={16}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      </div>

      <Stepper
        currentState={current}
        setCurrent={setCurrent}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
      {/* Choose gift box */}
      {current == 1 && (
        <Fragment>
          <GiftList
            data={shop?.products.map((item) => ({
              giftId: item.id,
              coverImage: item.srcImage,
              price: item.currentCost,
              name: item.name,
            }))}
            isLoading={isLoading}
            addItem={addItems}
          />
          {/* <Pagination currentPage={1} goToPage={() => {}} /> */}
        </Fragment>
      )}
      {/* Choose gift */}
      {current == 2 && (
        <Fragment>
          <GiftList
            data={shop?.gifts.filter((item) => item.type === "box")}
            isLoading={isLoading}
            addItem={addBox}
          />
          {/* <Pagination currentPage={1} goToPage={() => {}} /> */}
        </Fragment>
      )}
      {/* Choose envelope */}
      {current == 3 && (
        <GiftList
          data={shop?.gifts.filter((item) => item.type === "card")}
          isLoading={isLoading}
          addItem={addCard}
        />
      )}
      <div className="flex space-x-3 justify-center">
        {current > 1 && (
          <button
            onClick={() => {
              // current == 3 && setIsCompleted(false);
              setCurrent((prev) => prev - 1);
            }}
            className="w-full md:w-auto flex justify-center items-center py-3 px-9 space-x-2 font-sans font-bold text-orange-600 border-orange-600 border-2  bg-white rounded-md  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
          >
            Quay lại
          </button>
        )}
        <button
          onClick={() => {
            console.log(`current = ${current}`);
            current == 3 && isCompleted && setIsOpenedGiftDetailModal(true);
            current == 3
              ? setIsCompleted(true)
              : setCurrent((prev) => prev + 1);
          }}
          className="w-full md:w-auto flex justify-center items-center py-3 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
        >
          {current == 3 ? "Hoàn thành" : "Tiếp tục"}
        </button>
      </div>
    </div>
  );
});

export default Gift;
