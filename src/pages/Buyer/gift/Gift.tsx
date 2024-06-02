import { memo, FC, useState, Fragment } from "react";
import Stepper from "./components/Stepper";
import { GiftOutlined } from "@ant-design/icons";
import GiftDetailModal from "./components/GiftDetailModal.js";
import SuccessfulModal from "./components/SuccessfulModal.js";
import { useParams } from "react-router-dom";
import useFetchShopInformation from "src/pages/Seller/Shop/hooks/useFetchShopInformation.js";
import GiftList from "./components/GiftList.js";
import Spinner from "@components/common/ui/Spinner.js";
import { ProductComponentProps } from "./components/ProductComponent.js";
import _ from "lodash";
import { useUINotification } from "./hooks/useUINotification.js";
/* 
  Remember adding loading indicator for item list
*/
const Gift: FC = memo(() => {
  const { seller } = useParams();
  const { shop, isLoading } = useFetchShopInformation(seller as string);
  console.log(shop);
  const { notify, warn } = useUINotification();
  const [current, setCurrent] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpenedGiftDetailModal, setIsOpenedGiftDetailModal] = useState(false);
  const [isDone, setIsDone] = useState(false);
  // const { data: products, page, setPage, isFetching } = useProductPagination();
  const [giftItems, setGiftItems] = useState({});
  const [giftCard, setGiftCard] = useState<[]>([]);
  const [giftBox, setGiftBox] = useState<[]>([]);

  const addItems = (newItem: ProductComponentProps) => {
    setGiftItems((items) => {
      if (!items[newItem.productId]) {
        return {
          ...items,
          [newItem.productId]: {
            ...newItem,
            quantity: 1,
          },
        };
      } else {
        return {
          ...items,
          [newItem.productId]: {
            ...items[newItem.productId],
            quantity: items[newItem.productId].quantity + 1,
          },
        };
      }
    });
    console.log(`giftItems`);

    console.log(giftItems);
    notify("Thêm thành công");
  };
  const addBox = (newBox: ProductComponentProps) => {
    setGiftBox([{ ...newBox, quantity: 1 }]);
    console.log(`giftBox`);
    console.log(giftBox);
    notify("Cập nhật thành công");
  };
  const addCard = (newCard: ProductComponentProps) => {
    setGiftCard([{ ...newCard, quantity: 1 }]);
    notify("Cập nhật thành công");
  };
  const handleAddGift = () => {
    console.log(`current = ${current}`);
    if (current < 3) {
      setCurrent((prev) => prev + 1);
    } else {
      if (_.isEqual(giftItems, {})) {
        return warn("Vui lòng chọn quà");
      }
      if (_.isEqual(giftCard, [])) {
        return warn("Vui lòng chọn thiệp lời chúc");
      }
      if (_.isEqual(giftBox, [])) {
        return warn("Vui lòng chọn hộp quà");
      }
      setIsOpenedGiftDetailModal(true);
    }
  };

  if (isLoading) {
    <Spinner />;
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
        setCard={setGiftCard}
        setBox={setGiftBox}
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
              productId: item.id,
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
            data={shop?.boxes.map((item) => ({
              productId: item.id,
              coverImage: item.srcImage,
              price: item.currentCost,
              name: item.name,
            }))}
            isLoading={isLoading}
            addItem={addBox}
          />
          {/* <Pagination currentPage={1} goToPage={() => {}} /> */}
        </Fragment>
      )}
      {/* Choose envelope */}
      {current == 3 && (
        <GiftList
          data={shop?.cards.map((item) => ({
            productId: item.id,
            coverImage: item.srcImage,
            price: item.currentCost,
            name: item.name,
          }))}
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
          onClick={handleAddGift}
          className="w-full md:w-auto flex justify-center items-center py-3 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
        >
          {current == 3 ? "Hoàn thành" : "Tiếp tục"}
        </button>
      </div>
    </div>
  );
});

export default Gift;
