import Button from '@components/common/button/Button';
import { FC, memo, useState } from 'react';

const Order: FC = memo(() => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabTitles = [
    'Tất cả',
    'Đang xử lý',
    'Hoàn thành',
    'Đổi trả',
    'Đơn hủy',
  ];
  return (
    <div className=" min-h-screen mx-4 md:mx-20 space-y-6 my-6">
      <h1 className="text-2xl font-semibold font-sans text-center mt-4">
        Quản lý đơn hàng
      </h1>
      {/* Tab container */}
      <div className="flex justify-center space-y-4">
        {/* Tabs header  */}
        <div className="text-sm font-medium text-center text-black b border-gray-300">
          <ul className="flex flex-wrap">
            {tabTitles.map((title, index) => (
              <li
                onClick={() => setCurrentTab(index)}
                key={index}
                className="me-2"
              >
                <p
                  className={
                    currentTab == index
                      ? `inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active`
                      : `inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300`
                  }
                >
                  {title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Order list */}
      <div className="w-full md:w-1/2 mx-auto space-y-6 bg-[#FAFAFA] py-[20px] px-[45px] rounded-[7.5px] shadow-xl">
        {/* Order information */}
        <span className="flex flex-col md:flex-row justify-between border-b-2 border-b-gray-300 pb-4">
          <span className="text-[14px]">
            Đơn hàng <span className="font-semibold">#365878090</span> -{' '}
            <span className="text-[#258635]">Đã nhận hàng</span>
          </span>
          <span className="text-[13px]">
            Hỗ trợ trả hàng đến{' '}
            <span className="font-sans font-bold">23/4/2024</span>
          </span>
        </span>
        {/* Item container */}
        <ul className="space-y-4 pb-6 border-b-2 border-b-gray-300">
          <li className="flex space-x-4">
            <div>
              <img
                className="object-fit h-[65px] rounded-[7.5px]"
                src="https://i.etsystatic.com/41110180/c/1428/1135/250/409/il/dda275/5202883218/il_340x270.5202883218_b9y8.jpg"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between ">
                <p className="text-[14px] font-medium">
                  Christmas suncatcher stained glass...
                </p>
                <p className="text-orange-600 font-semibold">123,000đ</p>
              </div>
              <p className="text-orange-600 text-[14px] font-semibold">
                123,000đ
              </p>
              <p className="text-[13px] font-medium">x1</p>
            </div>
          </li>
          <li className="flex space-x-4">
            <div>
              <img
                className="object-fit h-[65px] rounded-[7.5px]"
                src="https://i.etsystatic.com/41110180/c/1428/1135/250/409/il/dda275/5202883218/il_340x270.5202883218_b9y8.jpg"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between ">
                <p className="text-[14px] font-medium">
                  Christmas suncatcher stained glass...
                </p>
                <p className="text-orange-600 font-semibold">123,000đ</p>
              </div>
              <p className="text-orange-600 text-[14px] font-semibold">
                123,000đ
              </p>
              <p className="text-[13px] font-medium">x1</p>
            </div>
          </li>
        </ul>
        {/* Bill container */}
        <div className="space-y-4">
          <p className="text-end">
            Thành tiền: <span className="text-orange-600">123,000đ </span>
          </p>
          {/* Button container */}
          <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-4 space-y-2 md:space-y-0">
            <Button className="text-[13px] font-sans text-center border-2 border-[#DC2626]  py-[10px] px-[45px] rounded-[6px]">
              Trả hàng
            </Button>
            <Button className="text-[13px] font-sans text-center border-2 border-orange-600 py-[10px] px-[27px] rounded-[6px]">
              Xem đơn hàng
            </Button>
            <Button className="text-[13px] font-sans text-center border-2 border-[#D1D5DB] py-[10px] px-[15px] rounded-[6px]">
              Nhắn tin với người bán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Order;
