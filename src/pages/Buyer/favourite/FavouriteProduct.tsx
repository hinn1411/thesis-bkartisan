import { useFavorite } from '@hooks/useFavorite';
import { FC, memo } from 'react';
import FavoriteCardList from './components/FavoriteCardList';
import {SearchOutlined} from "@ant-design/icons"
import Pagination from '@components/common/pagination/Pagination';
const FavouriteProduct: FC = memo(() => {
  const {favorites, isFetching} = useFavorite();
  console.log(`favorites = `, favorites);

  return (
    <main className="min-h-screen px-4 md:px-20 my-5 space-y-6">
      <div className="flex flex-col md:flex-row flex-1 items-start md:items-center justify-center text-xl my-2 space-y-2 md:space-y-0">
        <p className="grow">Tổng số sản phẩm yêu thích: 30</p>
        <div className="grow flex items-end justify-start w-full md:w-1/3 space-x-1">
          <SearchOutlined />
          <input
            className="flex-1 md:flex-initial border-b-2 border-b-black  px-1 focus:outline-none text-base placeholder:text-sm"
            placeholder="Tìm kiếm sản phẩm yêu thích của bạn"
          />
        </div>
      </div>
      {/* FavoriteCardList -> FavoriteCard* */}
      <FavoriteCardList data={favorites} isLoading={isFetching} />
      <Pagination />
    </main>
  );
});

export default FavouriteProduct;
