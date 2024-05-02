import { FC, memo } from 'react';
import CategoryCard from '../../../components/common/category/CategoryCard';

// Product images
import ProductCard, {
  ProductCardProps,
} from '../../../components/common/product/ProductCard';
import Pagination from '../../../components/common/pagination/Pagination';
import { useProductPagination } from './hooks/useProductPagination';
import { useTranslation } from 'react-i18next';
import { useCategory } from '../../../hooks/useCategory';
import { useGift } from './hooks/useGift';

import CategoryCardSkeleton, {
  CategoryCardSkeletonList,
} from '../../../components/common/category/CategoryCardSkeleton';
import ProductList from '@components/common/product/ProductList';
import ProductSkeleton, { ProductSkeletonList } from '@components/common/product/ProductSkeleton';

/*
  remember adding skeleton when fetching data
*/

const Home: FC = memo(() => {
  console.log(`render home`);
  const { t } = useTranslation();
  const {
    data: products,
    page,
    setPage,
    isSuccess,
    isFetching,
  } = useProductPagination();
  const { gifts, isPending: isLoadingGifts } = useGift();
  return (
    <main className="min-h-screen px-20 my-5">
      <h1 className="text-3xl text-center font-medium">
        {t('category.title')}
      </h1>
      {/* Category list */}

      {isLoadingGifts ? (
        <CategoryCardSkeletonList numberOfElement={6} />
      ) : (
        <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 items-center justify-evenly text-base space-x-2 my-8 border-b-2 pb-8 border-b-gray-300">
          {gifts.map((gift: any) => (
            <CategoryCard key={gift.id} {...gift} />
          ))}
        </ul>
      )}

      {/* Product list */}
      {/* <ProductSkeleton /> */}
      <ProductList data={products} isLoading={isFetching} />
      {/* <ul className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isSuccess &&
          products.map((product: ProductCardProps, index: number) => (
            <ProductCard key={index} {...product} />
          ))}
      </ul> */}
      <Pagination currentPage={page} goToPage={setPage} />
    </main>
  );
});

export default Home;
