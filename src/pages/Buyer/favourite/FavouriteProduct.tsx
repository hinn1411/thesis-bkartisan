import { FC, memo } from 'react';

const FavouriteProduct: FC = memo(() => {
  return (
    <main className="min-h-screen px-20 my-5">
      <div className="text-xl my-2">
        <span>Tổng số sản phẩm yêu thích: 30</span>
      </div>

    </main>
  );
});

export default FavouriteProduct;
