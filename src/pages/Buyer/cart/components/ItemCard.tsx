import {
  ChangeEvent,
  FC,
  memo,
  useContext,
  useDeferredValue,
  useState,
} from "react";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { useHandleCart } from "../hooks/useHandleCart";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import DeleteItemModal from "./DeleteItemModal";
import { BsPlus } from "react-icons/bs";
import { CartContext, CartContextType } from "src/store/CartContext";

export interface ItemCardProps {
  productId: number;
  sellerImage: string;
  sellerName: string;
  itemName: string;
  itemImage: string;
  note: string;
  size?: string;
  color?: string;
  quantity: number;
  currentPrice: number;
  originalPrice: number;
  percentageOfDiscount: number;
  isGift: boolean;
  sellerUsername: string;
}
const ItemCard: FC<ItemCardProps> = memo(
  ({
    productId,
    sellerImage,
    sellerName,
    itemName,
    itemImage,
    color,
    size,
    note,
    quantity,
    currentPrice,
    originalPrice,
    percentageOfDiscount,
    sellerUsername,
  }) => {
    const navigate = useNavigate();
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [currentNote, setCurrentNote] = useState<string>(note);

    const deferedNote = useDeferredValue(currentNote);
    const { updateNumberOfItems, updateOriginalPrice } = useContext(
      CartContext
    ) as CartContextType;
    const { updateCart, deleteCart } = useHandleCart();
    const deferedQuantity = useDeferredValue(currentQuantity);
    const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
    const [isOpenedAddNote, setIsOpenedAddNote] = useState(false);
    const currentCost = formatCurrency(
      currentPrice * currentQuantity,
      CURRENCIES.VIETNAMDONG
    );
    const originalCost = formatCurrency(originalPrice, CURRENCIES.VIETNAMDONG);

    // useEffect(() => {
    //   updateCart({ productId, quantity: currentQuantity, note: currentNote });
    // }, [currentQuantity, currentNote]);

    const openDeleteItemModal = () => {
      setIsOpenedDeleteModal(true);
    };

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
      let newQuantity = +e.target.value;
      console.log(`newQuantity = ${newQuantity}`);
      if (newQuantity > 999) {
        return;
      }
      if (!newQuantity) {
        newQuantity = 1;
      }
      setCurrentQuantity(newQuantity);
      updateNumberOfItems(newQuantity - currentQuantity);
      updateOriginalPrice((newQuantity - currentQuantity) * currentPrice);
    };
    const handleUpdateCart = () => {
      updateCart({ productId, quantity: currentQuantity, note: currentNote });
    };
    const increaseItem = () => {
      if (currentQuantity == 999) {
        return;
      }
      setCurrentQuantity((prev) => {
        updateCart({ productId, quantity: prev + 1, note: currentNote });
        return prev + 1;
      });

      console.log(`update cart when increase`);

      updateNumberOfItems(1);
      updateOriginalPrice(currentPrice);
    };
    const decreaseItem = () => {
      if (currentQuantity == 1) {
        return;
      }
      setCurrentQuantity((prev) => {
        updateCart({ productId, quantity: prev - 1, note: currentNote });
        return prev - 1;
      });

      updateNumberOfItems(-1);
      updateOriginalPrice(-currentPrice);
    };
    const deleteItem = async () => {
      updateNumberOfItems(-currentQuantity);
      return await deleteCart({ productId });
    };
    const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newNote = e.target.value;
      setCurrentNote(newNote);
    };
    const handleChatWithSeller = () => {
      navigate("/message", {
        state: {
          username: sellerName,
          name: sellerUsername,
          avatar: sellerImage,
        },
      });
    };
    return (
      <div className="shadow-lg rounded-[12px] border border-black border-opacity-25">
        <DeleteItemModal
          onDelete={() =>
            deleteItem().then(() => setIsOpenedDeleteModal(false))
          }
          isOpen={isOpenedDeleteModal}
          setIsOpen={setIsOpenedDeleteModal}
        />

        {/* Inner container */}
        <div className="p-4 flex flex-col space-y-2">
          {/* Seller information */}
          <div className="flex items-center justify-between">
            <Link
              to={`/shop/${sellerName}`}
              className="flex space-x-3 items-center"
            >
              {/* Shop image */}
              <img
                src={sellerImage}
                className="border border-black rounded-[6px] w-[32px] h-[32px]"
                alt="shop image"
              />
              {/* Shop name */}
              <p className="text-base">{sellerName}</p>
            </Link>
            <p
            onClick={handleChatWithSeller}
             className="hover:underline hover:cursor-pointer opacity-90 text-medium">
              Liên hệ với shop
            </p>
          </div>
          {/* Product information */}
          <div className="flex items-start space-y-2 md:space-y-0 space-x-3">
            {/* Image container */}
            <div className="w-full h-full flex-1">
              <Link to={`/products/${productId}`}>
                <img
                  src={itemImage}
                  alt="product image"
                  className="w-[100px] h-[100px] border border-black border-opacity-50 rounded-[6px] object-cover hover:cursor-pointer"
                />
              </Link>
            </div>
            {/* Buttons container */}
            <div className="flex-[5] justify-between space-y-1">
              <div className="flex items-start justify-between hover:cursor-pointer">
                <div>
                  <Link to={`/products/${productId}`}>
                    <p className="line-clamp-1 overflow-hidden w-[200px]">
                      {itemName}
                    </p>
                  </Link>
                </div>

                <p className="text-[#258635] text-medium text-[20px]">
                  {currentCost}
                </p>
              </div>
              <div className="flex items-center justify-between">
                {size && <p className="text-[#595959]">Size: {size}</p>}
                <p className="text-[13px] text-thin text-[#595959]">
                  {originalCost} ({percentageOfDiscount}%)
                </p>
              </div>
              {color && <p className="text-[#595959]">Màu: {color}</p>}
              {/* Mangage button container */}
              <div className="flex items-center justify-between md:justify-start space-y-0 space-x-3 mt-2">
                {/* Add/Substract */}
                <div className="flex justify-center items-center space-x-2">
                  <div className="flex justify-center items-center">
                    <MinusCircleOutlined onClick={decreaseItem} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handleChangeQuantity}
                      onBlur={handleUpdateCart}
                      className="w-[60px] rounded-[4px] text-center outline-none"
                      value={deferedQuantity}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <PlusCircleOutlined onClick={increaseItem} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  </div>
                </div>
                {/* Edit/Remove */}
                <div className="flex items-center justify-center space-x-2">
                  {/* Edit */}
                  {/* <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
                    <div className="flex items-center justify-center">
                      <EditOutlined />
                    </div>
                    <p className="hover:underline">Sửa</p>
                  </div> */}
                  <div
                    onClick={openDeleteItemModal}
                    className="flex items-center justify-center space-x-1 hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <DeleteOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </div>
                    <p className="hover:underline">Xóa</p>
                  </div>
                </div>
              </div>
              {/* Description */}
              {/* <div className="flex items-center space-x-1 my-2">
                <div className="flex items-center justify-center">
                  <TagOutlined />
                </div>
                <div className="border-b border-b-black">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="w-25 border-none outline-none md:w-40 text-[13px] placeholder:font-mono focus:outline-none border-transparent focus:border-transparent focus:ring-0"
                  />
                </div>
                <button className="text-white bg-black px-3 py-1 text-[11px] rounded-[4px]">
                  Áp dụng
                </button>
              </div> */}
            </div>
          </div>
          <div className="text-[13px]">
            <div
              onClick={() => setIsOpenedAddNote((prev) => !prev)}
              className="flex items-center space-x-0"
            >
              <BsPlus />
              <p>Thêm lưu ý cho người bán</p>
            </div>

            <textarea
              onChange={handleChangeNote}
              onBlur={handleUpdateCart}
              value={deferedNote}
              rows={2}
              className={`w-full overflow-hidden transition-max-h duration-300 ${
                isOpenedAddNote ? "max-h-96" : "hidden"
              } p-2.5 bg-[#F3F4F6] rounded-[4px] border-black placeholder:font-mono placeholder:text-[13px]`}
              placeholder="Thêm mô tả cho sản phẩm"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ItemCard;
