import { useFavorite } from '@hooks/useFavorite';
import { FC, memo, useDeferredValue, useEffect } from 'react';
import FavoriteCardList from './components/FavoriteCardList';
import { SearchOutlined } from '@ant-design/icons';
import Pagination from '@components/common/pagination/Pagination';
const FavouriteProduct: FC = memo(() => {
  const {
    favorites,
    isFetching,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    refetch,
  } = useFavorite();
  const derefedSearchTerm = useDeferredValue(searchTerm);
  console.log(`favorites = `, favorites);

  useEffect(() => {
    const searchFavorites = setTimeout(() => {
      refetch();
    }, 1000);

    return () => clearTimeout(searchFavorites);
  }, [derefedSearchTerm, refetch]);
  return (
    <main className="min-h-screen px-4 md:px-20 my-5 space-y-6">
      <div className="flex flex-col md:flex-row flex-1 items-start md:items-center justify-center text-xl my-2 space-y-2 md:space-y-0">
        <p className="grow text-base">
          Tổng số sản phẩm yêu thích: {favorites.length}
        </p>
        <div className="grow flex items-end justify-start w-full md:w-1/3 space-x-1">
          <SearchOutlined />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:flex-initial border-b-2 border-b-black  px-1 focus:outline-none text-base placeholder:text-sm"
            placeholder="Tìm kiếm sản phẩm yêu thích của bạn"
          />
        </div>
      </div>
      {/* FavoriteCardList -> FavoriteCard* */}
      <FavoriteCardList data={favorites} isLoading={isFetching} />
      <Pagination currentPage={page} goToPage={setPage} />
    </main>
  );
});

export default FavouriteProduct;
