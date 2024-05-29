import { CURRENCIES } from "@contants/currencies";
import { formatCurrency } from "@utils/formatCurrency";
import { FC, memo } from "react";

export interface GiftItemProps {
  coverImage: string;
  name: string;
  price: number;
}

const GiftItem: FC<GiftItemProps> = memo(({ coverImage, price, name }) => {
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
  
      </div>
    </div>
  );
});

export default GiftItem;
