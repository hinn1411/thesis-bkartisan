import { FC, memo } from 'react';

const CheckoutSuccess: FC = memo(() => {
  return (
    <div className="min-h-screen px-4 md:px-52 my-5 text-center space-y-6">
      <h1 className='text-xl font-sans font-semibold'>Thanh toán thành công!</h1>
      <p>Cảm ơn bạn đã mua sắm tại BK Artisan</p>
    </div>
  );
});

export default CheckoutSuccess;
