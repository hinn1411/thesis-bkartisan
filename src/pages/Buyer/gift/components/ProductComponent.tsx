import { FC, memo, Fragment, Dispatch } from "react";
import styles from "./GiftDetailModal.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { BiMinus, BiPlus } from "react-icons/bi";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
export interface ProductComponentProps {
  productId: number;
  coverImage: string;
  name: string;
  price: number;
  quantity: number;
  setItems: Dispatch<any>;
}

const ProductComponent: FC<ProductComponentProps> = memo(
  ({ coverImage, price, name, quantity, setItems, productId }) => {
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
              <img
                className="rounded-[5px] border h-[50px] w-[50px]"
                src={coverImage}
              />
            </div>
            {/* specifications container */}
            <div className="flex-[3]">
              <p className={`${styles.description} line-clamp-1`}>{name}</p>
              <p className={`${styles.price}`}>{formattedPrice}</p>
            </div>
          </div>
          {/* Button container */}

          <div className="flex-1 flex justify-end items-center space-x-2">
            {/* Minus icon */}
            <div className="flex justify-center items-center">
              <BiMinus
                onClick={() =>
                  setItems((items: ProductComponentProps[]) => {
                    if (quantity === 1) {
                      return items;
                    }
                    return {
                      ...items,
                      [productId]: {
                        ...items[productId],
                        quantity: items[productId].quantity - 1,
                      },
                    };
                  })
                }
                className="hover:cursor-pointer"
              />
            </div>
            {/* Quantity */}
            <div>
              <input
                value={quantity}
                className="w-[50px] appearance-none bg-transparent border-none text-black text-center py-1 px-2 leading-tight focus:outline-none"
                type="text"
                onChange={(e) => {
                  let newQuantity = +e.target.value;
                  if (+newQuantity > 999) {
                    newQuantity = 999;
                  }
                  setItems((items: ProductComponentProps[]) => ({
                    ...items,
                    [productId]: {
                      ...items[productId],
                      quantity: newQuantity,
                    },
                  }));
                }}
              ></input>
            </div>
            {/* Plus icon */}
            <div className="flex justify-center items-center">
              <BiPlus
                onClick={() =>
                  setItems((items: ProductComponentProps[]) => {
                    return {
                      ...items,
                      [productId]: {
                        ...items[productId],
                        quantity: items[productId].quantity + 1,
                      },
                    };
                  })
                }
                className="hover:cursor-pointer"
              />
            </div>
          </div>

          {/* Delete icon */}
          <div
            onClick={() =>
              setItems((items: ProductComponentProps[]) => {
                const newItems = { ...items };
                delete newItems[productId];
                return newItems;
              })
            }
            className="flex flex-1 justify-end items-center space-x-1 hover:cursor-pointer"
          >
            <div className="flex justify-center items-center">
              <DeleteOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            <p>Xóa</p>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default ProductComponent;
