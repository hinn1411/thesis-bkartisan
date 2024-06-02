import {
  DeleteOutlined,
  GiftOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { FC, memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteItemModal from "./DeleteItemModal";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import GiftDetails from "./GiftDetails";
import { useDeleteGift } from "../hooks/useDeleteGift";

export interface GiftCardProps {
  isGift: boolean;
  avatar: string;
  username: string;
  user: string;
  giftName: string;
  giftPrice: number;
  items: any;
  totalQuantity: number;
}

const GiftCard: FC<GiftCardProps> = memo(
  ({ avatar, username, giftName, giftPrice, items, totalQuantity, user }) => {
    const navigate = useNavigate();
    const [isOpenGift, setIsOpenGift] = useState(false);
    const { deleteGift, isOpenedDeleteModal, setIsOpenedDeleteModal } =
      useDeleteGift();
    const formattedGiftPrice = formatCurrency(
      giftPrice,
      CURRENCIES.VIETNAMDONG
    );
    const openDeleteItemModal = () => {
      setIsOpenedDeleteModal(true);
    };
    console.log(`username = ${username}, name = ${name}, avatar = ${avatar}`);

    const handleChatWithSeller = () => {
      navigate("/message", {
        state: {
          username: username,
          name: user,
          avatar: avatar,
        },
      });
    };
    return (
      <div className="shadow-lg rounded-[12px] border border-black border-opacity-25">
        <DeleteItemModal
          // onDelete={() => deleteItem().then(() => setIsOpenedDeleteModal(false))}
          onDelete={() => deleteGift(giftName)}
          isOpen={isOpenedDeleteModal}
          setIsOpen={setIsOpenedDeleteModal}
        />

        {/* Inner container */}
        <div className="p-4 flex flex-col space-y-2">
          {/* Seller information */}
          <div className="flex items-center justify-between">
            <Link
              to={`/shop/${username}`}
              className="flex space-x-3 items-center"
            >
              {/* Shop image */}
              <img
                src={avatar}
                className="border border-black rounded-[6px] w-[32px] h-[32px]"
                alt="shop image"
              />
              {/* Shop name */}
              <p className="text-base">{username}</p>
            </Link>
            <p
              onClick={handleChatWithSeller}
              className="hover:underline hover:cursor-pointer opacity-90 text-medium"
            >
              Liên hệ với shop
            </p>
          </div>
          {/* Product information */}
          <div className="flex items-start space-y-2 md:space-y-0 space-x-3">
            {/* Image container */}
            <div className="flex-1">
              <Link to={`/products/${1}`}>
                <img
                  src={
                    items?.filter((item) => item.type === "box")[0].coverImage
                  }
                  alt="product image"
                  className="w-[100px] h-[100px] border-2 border-orange-600 rounded-[6px] object-cover hover:cursor-pointer"
                />
              </Link>
            </div>
            {/* Buttons container */}
            <div className="flex-[5] flex flex-col justify-between space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-1">
                  <GiftOutlined
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                    }}
                    className="text-orange-600"
                  />
                  <p className="line-clamp-1 overflow-hidden w-[200px] text-orange-600">
                    Quà{" "}
                    <span className="text-sm font-semibold">{giftName}</span>
                  </p>
                </div>

                <p className="text-[#258635] text-medium text-[20px]">
                  {formattedGiftPrice}
                </p>
              </div>
              <div>
                <p>
                  Tổng sản phẩm:{" "}
                  <span className="font-semibold text-sm">{totalQuantity}</span>
                </p>
              </div>
              {/* Mangage button container */}
              <div className="flex items-center justify-between md:justify-start space-y-0 space-x-3 mt-2">
                {/* View */}

                <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
                  <GiftDetails
                    isOpen={isOpenGift}
                    setIsOpen={setIsOpenGift}
                    items={items.filter((item) => item.type == "item")}
                    card={items.filter((item) => item.type == "card")}
                    box={items.filter((item) => item.type == "box")}
                  />
                  <div className="flex items-center justify-center">
                    <ZoomInOutlined
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </div>
                  <p
                    onClick={() => setIsOpenGift(true)}
                    className="hover:underline"
                  >
                    Xem quà
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  {/* Edit */}

                  <div
                    onClick={openDeleteItemModal}
                    className="flex items-center justify-center space-x-1 hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <DeleteOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    </div>
                    <p className="hover:underline">Xóa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default GiftCard;
