import { CURRENCIES } from "@contants/currencies";
import { formatCurrency } from "@utils/formatCurrency";
import { FC, memo } from "react";

export interface ItemProps {
  coverImage: string;
  name: string;
  discount: number;
  quantity: number;
  price: number;
}

const Item: FC<ItemProps> = memo(
  ({ coverImage, name, discount, quantity, price }) => {
    return (
      <li className="flex space-x-4">
        <div>
          <img
            className="object-fit h-[65px] w-[65px] rounded-[7.5px]"
            src={coverImage}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between ">
            <p className="text-[14px] font-medium">{name}</p>
            <p className="text-orange-600 font-semibold">
              {formatCurrency(
                quantity * price * (1 - discount / 100),
                CURRENCIES.VIETNAMDONG
              )}
            </p>
          </div>
          <p className="text-orange-600 text-[14px] font-semibold">
            {formatCurrency(
              price * (1 - discount / 100),
              CURRENCIES.VIETNAMDONG
            )}
          </p>
          <p className="text-[13px] font-medium">x{quantity}</p>
        </div>
      </li>
    );
  }
);

export default Item;
