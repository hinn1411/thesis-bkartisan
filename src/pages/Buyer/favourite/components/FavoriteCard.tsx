import Button from '@components/common/button/Button';
import { FC, memo } from 'react';
import { StarFilled, PlusOutlined, HeartFilled } from '@ant-design/icons';
import DotIcon from '@images/product/dot.png';
import { formatCurrency } from '@utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';
export interface FavoriteCardProps {
  id: number;
  image: string;
  name: string;
  numberOfStars: number;
  numberOfRatings: number;
  currentPrice: number;
  originalPrice: number;
  seller: string;
  discount: number;
}

const FavoriteCard: FC<FavoriteCardProps> = memo(
  ({
    image,
    name,
    numberOfRatings,
    numberOfStars,
    seller,
    currentPrice,
    originalPrice,
    discount,
  }) => {
    const currentCost = formatCurrency(currentPrice, CURRENCIES.VIETNAMDONG);
    const originalCost = formatCurrency(originalPrice, CURRENCIES.VIETNAMDONG);
    return (
      <div className="mx-auto relative max-w-sm rounded-[10px] border overflow-hidden shadow-sm">
        {/* Inner container */}
        <div className="p-3">
          <div className="">
            <div className="flex items-center justify-center absolute top-6 right-6 z-1 p-2 rounded-full border-2 border-slate-200 bg-white ">
              <HeartFilled
                style={{
                  color: '#B50330',
                }}
              />
            </div>

            <img
              src={image}
              className="object-fit h-[225px] w-[300px] rounded-[5px] border border-black border-opacity-50 hover:cursor-pointer"
              alt="product image"
            />
          </div>
          <p className="w-[300px] md:w-auto line-clamp-1 text-[14px] font-medium">{name}</p>
          {/* Details container */}
          <div className="flex justify-start items-center font-medium text-[13px] space-x-1">
            <span>{numberOfStars}</span>
            <div className="flex items-center justify-center">
              <StarFilled />
            </div>
            <div>({numberOfRatings})</div>
            <img src={DotIcon} alt="dot icon" />
            <div>{seller}</div>
          </div>
          {/* Price container */}
          <div className="flex items-center justify-start space-x-1">
            <div className="text-base oldstyle-nums text-[#258635] font-medium">
              {currentCost}
            </div>
            {discount > 0 && (
              <div className="text-[12px] opacity-90">
                {originalCost} ({discount}%)
              </div>
            )}
          </div>
          {/* Button container */}
          <div className="flex justify-between items-center mt-1">
            <Button className="flex items-center space-x-2 bg-white px-4 py-2 border border-black rounded-full hover:shadow-md">
              <PlusOutlined />
              <p className="text-sm">Add to card </p>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default FavoriteCard;
