import { ChangeEvent, FC, memo, useContext, useEffect } from 'react';
import momoImage from '@images/cart/momo.png';
import { useCart } from './hooks/useFetchCart';
import ItemList from './components/ItemList';
import { DiscountProps, useDiscount } from './hooks/useDiscount';
import { formatCurrency } from '@utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';
import { useHandleDiscount } from './hooks/useHandleDiscount';
import { CartContext, CartContextType } from 'src/store/CartContext';
import { Link } from 'react-router-dom';
const Cart: FC = memo(() => {
  const { numberOfItems, originalPrice, discountPrice } = useContext(
    CartContext
  ) as CartContextType;
  const { cart, isFetching } = useCart();
  const { discount, setDiscount, discountList, applyDiscount } = useDiscount();
  const { clearDiscount } = useHandleDiscount();

  useEffect(() => {
    window.onbeforeunload = () => {
      clearDiscount();
    };
    return () => {
      window.onbeforeunload = null;
    };
  });
  const handleChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    const newDiscountVal = e.target.value;
    setDiscount((prev) => newDiscountVal);
  };
  const handleUseDiscount = () => {
    if (!discount) {
      return;
    }
    applyDiscount(discount);
  };

  const subTotal = formatCurrency(
    originalPrice - discountPrice,
    CURRENCIES.VIETNAMDONG
  );
  // shipping cost is missing from BE
  const orderPrice = formatCurrency(
    originalPrice - discountPrice - 0,
    CURRENCIES.VIETNAMDONG
  );
  // const totalPrice = new Intl.NumberFormat('vi-VN', {
  //   style: 'currency',
  //   currency: 'VND',
  // }).format(1950000);
  return (
    <div className="min-h-screen px-4 md:px-20 my-5">
      <h1 className="text-2xl my-3">Tổng số sản phẩm: {numberOfItems}</h1>
      <div className="flex flex-col sm:flex-row justify-between space-y-8 md:space-y-0 md:space-x-6">
        {/* Items container */}
        <ItemList
          className="w-full md:w-[50%] flex flex-col space-y-3"
          isLoading={isFetching}
          data={cart}
        />
        {/* Payment container */}
        <div className="w-full md:w-[30%] text-start">
          <div className="text-lg font-medium text-center md:text-start">
            Hình thức thanh toán
          </div>
          {/* Radio container  */}
          <div className="flex flex-col space-y-4 my-2">
            <div className="flex items-center">
              <input
                defaultChecked
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
                Thanh toán khi nhận hàng (COD)
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
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                  alt="Momo icon"
                  className='object-cover w-16 p-1 rounded-[7.5px]'
                />
              </label>
            </div>
            {/* <div className="flex items-center mb-4">
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
            </div> */}
            {/* <div className="flex items-center mb-4">
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
            </div> */}
          </div>
          {/* Bill container */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between">
              <p>Tổng đơn hàng</p>
              <p>{formatCurrency(originalPrice, CURRENCIES.VIETNAMDONG)}</p>
            </div>
            <div className="">
              <p>Giảm giá</p>
              {discountList.map((discount: DiscountProps) => (
                <div className="text-sm flex justify-between">
                  <p>#{discount.code}</p>
                  <p>
                    -{formatCurrency(discount.value, CURRENCIES.VIETNAMDONG)}
                  </p>
                </div>
              ))}
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
            <div className="flex items-center justify-between">
              <p>Tổng phụ</p>
              <p>{subTotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Phí vận chuyển</p>
              <p>{formatCurrency(0, CURRENCIES.VIETNAMDONG)}</p>
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-gray-300 opacity-100 dark:opacity-50" />
            <div className="flex items-center justify-between">
              <p>Tổng tiền</p>
              <p>{orderPrice}</p>
            </div>
            {/* Button container */}
            <div className="flex flex-col space-y-3 my-4">
              <Link to="/checkout">
                <button className="text-base text-center bg-black rounded-full text-white w-full py-2">
                  Thanh toán
                </button>
              </Link>

              <div className="flex py-2">
                <input
                  onChange={handleChangeDiscount}
                  value={discount}
                  className="border border-black rounded-l-full w-2/3 py-2 px-2.5 text-sm border-opacity-50"
                  placeholder="Nhập mã"
                />
                <button
                  onClick={handleUseDiscount}
                  className="bg-black text-white text-center w-1/3 rounded-r-full"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Cart;
