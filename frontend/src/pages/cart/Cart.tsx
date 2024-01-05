import { FC, memo } from 'react';
import ItemCard from './components/ItemCard';
import shopImage from '../../assets/images/cart/shop-image.png';
import productImage from '../../assets/images/cart/img.png';
import momoImage from '../../assets/images/cart/momo.png';
import visaImage from '../../assets/images/cart/visa.png';
import mastercardImage from '../../assets/images/cart/mastercard.png';
import paypalImage from '../../assets/images/cart/paypal.png';
const Cart: FC = memo(() => {
  const orderPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(2000000);
  const discountPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(100000);
  const subTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(1900000);
  const shippingPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(50000);
  const totalPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(1950000);
  return (
    <div className="min-h-screen px-4 md:px-20 my-5">
      <p className="text-3xl ">Tổng số sản phẩm: 4</p>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6 mt-3">
        <div className="w-[100%] md:w-[65%] flex flex-col space-y-6">
          <ItemCard
            sellerImage={shopImage}
            sellerName="PrintCraftsmenCo"
            itemName="Ghost Plant Lady Sweatshirt"
            itemImage={productImage}
            size="XL"
            quantity={3}
            currentPrice={920147}
            originalPrice={1314602}
            percentageOfDiscount={30}
            color="Xanh sáng"
          />
          <ItemCard
            sellerImage={shopImage}
            sellerName="PrintCraftsmenCo"
            itemName="Ghost Plant Lady Sweatshirt"
            itemImage={productImage}
            size="XL"
            quantity={3}
            currentPrice={920147}
            originalPrice={1314602}
            percentageOfDiscount={30}
            color="Xanh sáng"
          />
          <ItemCard
            sellerImage={shopImage}
            sellerName="PrintCraftsmenCo"
            itemName="Ghost Plant Lady Sweatshirt"
            itemImage={productImage}
            size="XL"
            quantity={3}
            currentPrice={920147}
            originalPrice={1314602}
            percentageOfDiscount={30}
            color="Xanh sáng"
          />
          <ItemCard
            sellerImage={shopImage}
            sellerName="PrintCraftsmenCo"
            itemName="Ghost Plant Lady Sweatshirt"
            itemImage={productImage}
            size="XL"
            quantity={3}
            currentPrice={920147}
            originalPrice={1314602}
            percentageOfDiscount={30}
            color="Xanh sáng"
          />
        </div>
        {/* Payment container */}
        <div className="w-[100%] md:w-[30%] text-start">
          <div className="text-lg text-center md:text-start">
            Hình thức thanh toán
          </div>
          {/* Radio container  */}
          <div className="flex flex-col space-y-4 my-2">
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thanh toán khi nhận hàng
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                <img src={momoImage} alt="Momo icon" />
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-3"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-3"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                <div className="flex items-center space-x-4">
                  <img src={visaImage} alt="Momo icon" />
                  <img src={mastercardImage} alt="Momo icon" />
                </div>
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-4"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-4"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                <img src={paypalImage} alt="Momo icon" />
              </label>
            </div>
          </div>
          {/* Bill container */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between">
              <p>Tổng đơn hàng</p>
              <p>{orderPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Giảm giá</p>
              <p>{discountPrice}</p>
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
            <div className="flex items-center justify-between">
              <p>Tổng phụ</p>
              <p>{subTotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Phí vận chuyển</p>
              <p>{shippingPrice}</p>
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
            <div className="flex items-center justify-between">
              <p>Tổng tiền</p>
              <p>{totalPrice}</p>
            </div>
            {/* Button container */}
            <div className='flex flex-col space-y-3 my-4'>
              <button className='text-base text-center bg-black rounded-full text-white w-full py-2'>Thanh toán</button>
              <div className='flex py-2'>
                <input className='border border-black rounded-l-full w-2/3 py-2 px-2.5 text-sm border-opacity-50' placeholder='Nhập mã' />
                <button className='bg-black text-white text-center w-1/3 rounded-r-full'>Áp dụng</button>  
              </div>           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Cart;
