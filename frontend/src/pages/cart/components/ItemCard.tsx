import { FC, memo } from 'react';
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  TagOutlined,
} from '@ant-design/icons';
interface ItemCardProps {
  sellerImage: string;
  sellerName: string;
  itemName: string;
  itemImage: string;
  size?: string;
  color?: string;
  quantity: number;
  currentPrice: number;
  originalPrice: number;
  percentageOfDiscount: number;
}
const ItemCard: FC<ItemCardProps> = memo(
  ({
    sellerImage,
    sellerName,
    itemName,
    itemImage,
    color,
    size,
    quantity,
    currentPrice,
    originalPrice,
    percentageOfDiscount,
  }) => {
    const currentCost = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(currentPrice);
    const originalCost = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(originalPrice);
    return (
      <div className="shadow-lg rounded-[12px] border border-black border-opacity-25">
        {/* Inner container */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-3 items-center">
              {/* Shop image */}
              <img
                src={sellerImage}
                className="border border-black rounded-[6px] w-[32px] h-[32px]"
                alt="shop image"
              />
              {/* Shop name */}
              <p className="text-base">{sellerName}</p>
            </div>
            <p className="hover:underline hover:cursor-pointer opacity-90 text-medium">
              Liên hệ với shop
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-2   md:space-y-0 md:space-x-3">
            {/* Content container */}
            <div>
              <div className="h-full">
                <img
                  src={itemImage}
                  alt="product image"
                  className="rounded-[6px] object-fit w-full h-full"
                />
              </div>
            </div>
            <div className="w-full flex-flex-col justify-between space-y-1">
              <div className="flex items-center justify-between">
                <div>{itemName}</div>
                <div className="text-[#258635] text-medium text-[20px]">
                  {currentCost}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[#595959]">Size: {size}</div>
                <div className="text-[13px] text-thin text-[#595959]">
                  {originalCost} ({percentageOfDiscount}%)
                </div>
              </div>
              <p className="text-[#595959]">Màu: {color}</p>
              {/* Mangage button container */}
              <div className="flex items-center justify-between md:justify-start space-y-0 space-x-3 mt-2">
                {/* Add/Substract */}
                <div className="flex justify-center items-center space-x-2">
                  <div className="flex justify-center items-center">
                    <MinusCircleOutlined />
                  </div>
                  <div>
                    <input
                      type="number"
                      className="w-[50px] border-2 border-black rounded-[4px] text-center"
                      value={quantity}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <PlusCircleOutlined />
                  </div>
                </div>
                {/* Edit/Remove */}
                <div className="flex items-center justify-center space-x-2">
                  {/* Edit */}
                  <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
                    <div className="flex items-center justify-center">
                      <EditOutlined />
                    </div>
                    <p className="hover:underline">Sửa</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 hover:cursor-pointer">
                    <div className="flex items-center justify-center">
                      <DeleteOutlined />
                    </div>
                    <p className="hover:underline">Xóa</p>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="flex items-center space-x-1 my-2">
                <div className="flex items-center justify-center">
                  <TagOutlined />
                </div>
                <div className="border-b border-b-black">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="w-25 border-none md:w-40 text-[13px] placeholder:font-mono focus:outline-none"
                  />
                </div>
                <button className="text-white bg-black px-3 py-1 text-[11px] rounded-[4px]">
                  Áp dụng
                </button>
              </div>
              <div>
                <div className="text-[13px]">Thêm lưu ý cho người bán</div>
                <textarea
                  rows={2}
                  className="w-full block p-2.5 bg-[#F3F4F6] rounded-[4px] border-black placeholder:font-mono placeholder:text-[13px]"
                  placeholder="Mô tả"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ItemCard;
