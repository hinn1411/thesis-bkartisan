import { FC, memo, SyntheticEvent } from 'react';
import dotIcon from '../../../assets/images/product/dot.png';
import {
  StarFilled,
  PlusOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';
import { useModifyFavorite } from '@hooks/useModifyFavorite';
import { useCart } from '@hooks/useCart';
export interface ProductCardProps {
  id: number;
  srcImage: string;
  name: string;
  star: number;
  seller: string;
  numOfRating: number;
  currentCost: number;
  originalCost: number;
  percentageOfDiscount: number;
  isNew?: boolean;
  isBuyingGiftProcess?: boolean;
  productType?: string;
}

const ProductCard: FC<ProductCardProps> = memo(
  ({
    id,
    srcImage,
    name,
    star,
    seller,
    numOfRating,
    currentCost,
    originalCost,
    percentageOfDiscount,
    isNew,
  }) => {
    const navigate = useNavigate();
    const { mutate } = useModifyFavorite();
    const { addToCart: addProduct } = useCart();
    const currentPrice = formatCurrency(currentCost, CURRENCIES.VIETNAMDONG);
    const originalPrice = formatCurrency(originalCost, CURRENCIES.VIETNAMDONG);

    const addToFavoriteList = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      mutate(id);
    };
    const addToCart = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      addProduct({ productId: id, quantity: 1 });
    };
    return (
      <div
        onClick={() => navigate(`/products/${id}`)}
        className="mx-auto relative max-w-sm rounded-[10px] border overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 duration-300"
      >
        {/* Inner container */}
        <div className="px-3 py-3">
          <div>
            {isNew && (
              <div className="absolute top-6 left-6 z-10 px-4 rounded-xl border-2 border-slate-200 bg-white ">
                Mới
              </div>
            )}
            <img
              src={srcImage}
              className="object-cover h-[225px] w-[300px] rounded-[5px] border border-black border-opacity-50 hover:cursor-pointer"
              alt="product image"
            />
          </div>
          <div className="line-clamp-1 text-[14px] font-medium">{name}</div>
          {/* Details container */}
          <div className="flex justify-start items-center font-medium text-[13px] space-x-1">
            <span>{star}</span>
            <div className="flex items-center justify-center">
              <StarFilled />
            </div>
            <div>({numOfRating})</div>
            <img src={dotIcon} alt="dot icon" />
            <div>{seller}</div>
          </div>
          {/* Price container */}
          <div className="flex items-center justify-start space-x-1">
            <div className="text-base oldstyle-nums text-[#258635] font-medium">
              {currentPrice}
            </div>
            <div className="text-[12px] opacity-90">
              {originalPrice} ({percentageOfDiscount}%)
            </div>
          </div>
          {/* Button container */}
          <div className="flex justify-between items-center mt-1">
            <button
              onClick={addToCart}
              className="flex items-center justify-center space-x-1 rounded-full border-2 border-black px-7 py-1"
            >
              <PlusOutlined className="flex items-center justify-center text-sm" />
              <ShoppingOutlined className="flex items-center justify-center text-2xl" />
            </button>
            <button
              onClick={addToFavoriteList}
              className="flex items-center justify-center space-x-1 rounded-full border-2 border-black px-7 py-1"
            >
              <PlusOutlined className="flex items-center justify-center text-sm" />
              <HeartOutlined className="flex items-center justify-center text-2xl" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
