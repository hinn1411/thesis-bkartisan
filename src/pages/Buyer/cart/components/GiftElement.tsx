import { CURRENCIES } from "@contants/currencies";
import { formatCurrency } from "@utils/formatCurrency";
import { FC, Fragment, memo } from "react";

export interface GiftElementProps {
  coverImage: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

const GiftElement: FC<GiftElementProps> = memo(
  ({ coverImage, name, price, quantity, discount }) => {
    const currentPrice = Math.floor(price * (1 - discount / 100));
    const formattedPrice = formatCurrency(currentPrice, CURRENCIES.VIETNAMDONG);
    const formattedTotal = formatCurrency(
      currentPrice * quantity,
      CURRENCIES.VIETNAMDONG
    );
    return (
      <Fragment>
        {/* <Modal isOpen={isDeletedModal} setIsOpen={setIsDeletedModal} /> */}
        {/* Item container */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <img
              className="h-[50px] w-[50px] overflow-hidden"
              src={coverImage}
            />
          </div>
          {/* specifications container */}
          <div className="flex-[10]">
            <div className="flex items-center justify-between">
              <p className={`text-[14px] line-clamp-1`}>{name}</p>
              <p className="text-[#258635]">{formattedTotal}</p>
            </div>

            <p className="space-x-1 flex items-center">
              <span className="text-[#258635]">{formattedPrice}</span>
              <span>x{quantity}</span>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default GiftElement;
