import { FC, memo, Fragment, Dispatch } from "react";
import styles from "./GiftDetailModal.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { BiMinus, BiPlus } from "react-icons/bi";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
export interface ProductComponentProps {
  giftId: string;
  coverImage: string;
  name: string;
  price: number;
  quantity: number;
  setItems: Dispatch<any>;
}

const ProductComponent: FC<ProductComponentProps> = memo(
  ({ coverImage, price, name, quantity, setItems, giftId }) => {
    const formattedPrice = formatCurrency(
      price * quantity,
      CURRENCIES.VIETNAMDONG
    );
    return (
      <Fragment>
        {/* <Modal isOpen={isDeletedModal} setIsOpen={setIsDeletedModal} /> */}
        <div className="flex justify-between items-start">
          {/* Item container */}
          <div className="flex flex-1 space-x-1">
            <div className="flex-1">
              <img className="h-[50px] w-[50px]" src={coverImage} />
            </div>
            {/* specifications container */}
            <div className="flex-[3]">
              <p className={`${styles.description} line-clamp-1`}>{name}</p>
              <p className={`${styles.price}`}>{formattedPrice}đ</p>
            </div>
          </div>
          {/* Button container */}
          <div className="flex-1">
            <div className="flex justify-center items-center space-x-2">
              <div className="flex justify-center items-center">
                <BiMinus
                  onClick={() =>
                    setItems((items) => {
                      if (quantity === 1) {
                        return items;
                      }
                      return {
                        ...items,
                        [giftId]: {
                          ...items[giftId],
                          quantity: items[giftId].quantity - 1,
                        },
                      };
                    })
                  }
                  className="hover:cursor-pointer"
                />
              </div>
              <div>
                <input
                  value={quantity}
                  className="w-[50px] appearance-none bg-transparent border-none text-black text-center py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  onChange={(e) => {
                    let newQuantity = e.target.value;
                    if (+newQuantity > 999) {
                      newQuantity = 999;
                    }
                    setItems((items) => ({
                      ...items,
                      [giftId]: {
                        ...items[giftId],
                        quantity: newQuantity,
                      },
                    }));
                  }}
                ></input>
              </div>
              <div className="flex justify-center items-center">
                <BiPlus
                  onClick={() =>
                    setItems((items) => {
                      return {
                        ...items,
                        [giftId]: {
                          ...items[giftId],
                          quantity: items[giftId].quantity + 1,
                        },
                      };
                    })
                  }
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div
            onClick={() =>
              setItems((items) => {
                const newItems = { ...items };
                delete newItems[giftId];
                return newItems;
              })
            }
            className="flex flex-1 justify-end items-center space-x-1 hover:cursor-pointer"
          >
            <div className="flex justify-center items-center">
              <DeleteOutlined />
            </div>
            <p>Xóa</p>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default ProductComponent;
