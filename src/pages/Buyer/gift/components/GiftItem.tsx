import Button from "@components/common/button/Button";
import { CURRENCIES } from "@contants/currencies";
import { formatCurrency } from "@utils/formatCurrency";
import { Dispatch, FC, memo } from "react";

export interface GiftItemProps {
  giftId: string;
  coverImage: string;
  name: string;
  price: number;
  addItem: Dispatch<never[]>;
}

const GiftItem: FC<GiftItemProps> = memo(
  ({ coverImage, price, name, addItem, giftId }) => {
    const formattedPrice = formatCurrency(price, CURRENCIES.VIETNAMDONG);
    return (
      <div className="mx-auto relative max-w-sm rounded-[10px] border overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 duration-300">
        {/* Inner container */}
        <div className="px-3 py-3">
          <div>
            <img
              src={coverImage}
              className="object-cover h-[225px] w-[300px] rounded-[5px] border border-black border-opacity-50 hover:cursor-pointer"
              alt="product image"
            />
          </div>
          <div className="line-clamp-1 text-[14px] font-medium">{name}</div>
          {/* Details container */}

          {/* Price container */}
          <div className="flex items-center justify-start space-x-1">
            <div className="text-base oldstyle-nums text-[#258635] font-medium">
              {formattedPrice}
            </div>
          </div>
          {/* Button container */}
          <Button
            onClick={() => addItem({ coverImage, price, name, giftId })}
            className="w-full  flex justify-center items-center py-2 font-sans text-sm font-semibold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
          >
            Chọn sản phẩm
          </Button>
        </div>
      </div>
    );
  }
);

export default GiftItem;
