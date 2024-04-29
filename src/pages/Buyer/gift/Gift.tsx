import { memo, FC, useState } from 'react';
import Stepper from './components/Stepper';
import { GiftOutlined } from '@ant-design/icons';
import { boxData, giftData, envelopeData } from './data.js';


import ProductCard from '../../../components/common/product/ProductCard.js';
import GiftDetailModal from './components/GiftDetailModal.js';
import SuccessfulModal from './components/SuccessfulModal.js';
/* 
  Remember adding loading indicator for item list
*/
const Gift: FC = memo(() => {
  console.log(`giftdata ne`);

  console.log(boxData);

  const [current, setCurrent] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpenedGiftDetailModal, setIsOpenedGiftDetailModal] = useState(false);
  const [isDone, setIsDone] = useState(false);
  return (
    <div className="min-h-screen px-20 my-5 space-y-5">
      <GiftDetailModal
        isOpen={isOpenedGiftDetailModal}
        setIsOpen={setIsOpenedGiftDetailModal}
        setIsDone={setIsDone}
      />
      <SuccessfulModal isOpen={isDone} setIsOpen={setIsDone} />
      <div className="space-y-1">
        <div className="text-3xl font-medium text-center">Tặng quà</div>
        <div className="flex justify-center items-center space-x-1 hover:cursor-pointer">
          <div
            onClick={() => setIsOpenedGiftDetailModal(true)}
            className="text-center"
          >
            Xem trước quà tặng
          </div>
          <GiftOutlined size={16} />
        </div>
      </div>

      <Stepper
        currentState={current}
        setCurrent={setCurrent}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
      {/* Choose gift box */}
      {current == 1 && (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {boxData.map((box, idx) => (
            <ProductCard
              key={idx}
              {...box}
              isBuyingGiftProcess={true}
              productType="hộp quà"
            />
          ))}
        </div>
      )}
      {/* Choose gift */}
      {current == 2 && (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {giftData.map((gift, idx) => (
            <ProductCard
              key={idx}
              {...gift}
              isBuyingGiftProcess={true}
              productType="quà"
            />
          ))}
        </div>
      )}
      {/* Choose envelope */}
      {current == 3 && (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {envelopeData.map((envelope, idx) => (
            <ProductCard
              key={idx}
              {...envelope}
              isBuyingGiftProcess={true}
              productType="thiệp chúc"
            />
          ))}
        </div>
      )}
      <div className="flex space-x-3 justify-center">
        {current > 1 && (
          <button
            onClick={() => {
              // current == 3 && setIsCompleted(false);
              setCurrent((prev) => prev - 1);
            }}
            className="w-full md:w-auto flex justify-center items-center py-3 px-9 space-x-2 font-sans font-bold text-orange-600 border-orange-600 border-2  bg-white rounded-md  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
          >
            Quay lại
          </button>
        )}
        <button
          onClick={() => {
            console.log(`current = ${current}`);
            current == 3 && isCompleted && setIsOpenedGiftDetailModal(true);
            current == 3
              ? setIsCompleted(true)
              : setCurrent((prev) => prev + 1);
          }}
          className="w-full md:w-auto flex justify-center items-center py-3 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
        >
          {current == 3 ? 'Hoàn thành' : 'Tiếp tục'}
        </button>
      </div>
    </div>
  );
});

export default Gift;
