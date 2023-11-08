import { FC, memo } from 'react';
import dotIcon from '../../../assets/images/product/dot.png';
import {
  StarFilled,
  PlusOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
interface ProductCardProps {
  srcImage: string;
  name: string;
  star: number;
  seller: string;
  numOfRating: number;
  currentCost: number;
  originalCost: number;
  percentageOfDiscount: number;
  isNew: boolean;
}

const ProductCard: FC<ProductCardProps> = memo(
  ({
    srcImage,
    name,
    star,
    seller,
    numOfRating,
    currentCost,
    originalCost,
    percentageOfDiscount,
    isNew
  }) => {
    const curPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(currentCost);
    const originalPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(originalCost);
    return (
      <div className="mx-auto relative">
        <div>
          {isNew && <div className="absolute top-3 left-3 z-10 px-4 rounded-full border-2 border-slate-200 bg-white ">Mới</div>}
          <img
            src={srcImage}
            className="object-cover rounded-[2px] border border-black border-opacity-50 hover:cursor-pointer"
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
            {curPrice}
          </div>
          <div className="text-[12px] opacity-50">
            {originalPrice} ({percentageOfDiscount}%)
          </div>
        </div>
        {/* Button container */}
        <div className="flex justify-between items-center mt-1">
          <button className="flex items-center justify-center space-x-1 rounded-full border-2 border-black px-7 py-1">
            <PlusOutlined className="flex items-center justify-center text-sm" />
            <ShoppingOutlined className="flex items-center justify-center text-2xl" />
          </button>
          <button className="flex items-center justify-center space-x-1 rounded-full border-2 border-black px-7 py-1">
            <PlusOutlined className="flex items-center justify-center text-sm" />
            <HeartOutlined className="flex items-center justify-center text-2xl" />
          </button>
        </div>
      </div>
    );
  }
);

export default ProductCard;
