import { FC, memo } from 'react';

const CheckoutFail: FC = memo(() => {
  return (
    <div className="min-h-screen px-4 md:px-52 my-5 space-y-6 text-center">
      <h1 className='text-xl font-sans font-semibold'>Thanh toán thất bại</h1>
      <p>Vui lòng thử lại</p>
    </div>
  );
});

export default CheckoutFail;
