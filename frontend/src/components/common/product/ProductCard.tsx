import { FC, memo } from 'react';
import dotIcon from '../../../assets/images/product/dot.png';
import {
  StarFilled,
  PlusOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
export interface ProductCardProps {
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
    srcImage,
    name,
    star,
    seller,
    numOfRating,
    currentCost,
    originalCost,
    percentageOfDiscount,
    isNew,
    isBuyingGiftProcess,
    productType,
  }) => {
    const navigate = useNavigate();
    const curPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(currentCost);
    const originalPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(originalCost);
    return (
      <div
        onClick={() => navigate('/products/:productId')}
        className="mx-auto relative max-w-sm rounded border overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 hover:duration-300"
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
              className="object-cover h-[225px] w-[300px] rounded-[2px] border border-black border-opacity-50 hover:cursor-pointer"
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
            <div className="text-[12px] opacity-90">
              {originalPrice} ({percentageOfDiscount}%)
            </div>
          </div>
          {/* Button container */}
          <div className="flex justify-between items-center mt-1">
            {isBuyingGiftProcess && (
              <button className="w-full flex justify-center items-center py-2 space-x-2 font-sans font-medium text-white rounded-md px-full bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                Chọn {productType}
              </button>
            )}
            {!isBuyingGiftProcess && (
              <>
                <button className="flex items-center justify-center space-x-1 rounded-full border-2 border-black px-7 py-1">
                  <PlusOutlined className="flex items-center justify-center text-sm" />
                  <ShoppingOutlined className="flex items-center justify-center text-2xl" />
                </button>
                <button className="flex items-center justify-center space-x-1 rounded-full border-2 border-black px-7 py-1">
                  <PlusOutlined className="flex items-center justify-center text-sm" />
                  <HeartOutlined className="flex items-center justify-center text-2xl" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
