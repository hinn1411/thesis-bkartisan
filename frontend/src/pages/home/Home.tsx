import { FC, memo } from 'react';
import CategoryCard from '../../components/common/category/CategoryCard';
// Product images
import ProductCard, {
  ProductCardProps,
} from '../../components/common/product/ProductCard';
import Pagination from '../../components/common/pagination/Pagination';
import { useProductPagination } from './hooks/useProductPagination';
import { useTranslation } from 'react-i18next';
import { categoryData } from './data';

/*
  remember adding skeleton when fetching data
*/

const Home: FC = memo(() => {
  console.log(`render home`);
  const { t } = useTranslation();
  const { data: products, page, setPage, isSuccess } = useProductPagination();

  return (
    <main className="min-h-screen px-20 my-5">
      <h1 className="text-3xl text-center font-medium">
        {t('category.title')}
      </h1>
      {/* Category list */}
      <div className="flex flex-col md:flex-row items-center justify-evenly text-base space-x-2 my-8 border-b-2 pb-8 border-b-gray-300">
        {categoryData.map((category) => (
          <CategoryCard
            key={category.id}
            srcImage={category.srcImage}
            categoryName={t(category.categoryName)}
          />
        ))}
      </div>
      {/* Product list */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isSuccess &&
          products.map((product: ProductCardProps, index: number) => (
            <ProductCard key={index} {...product} />
          ))}
      </div>
      <Pagination currentPage={page} goToPage={setPage} />
    </main>
  );
});

export default Home;
