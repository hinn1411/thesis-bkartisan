import { FC, memo, useState } from 'react';
import CategoryCard from '../../components/common/category/CategoryCard';
// Product images
import ProductCard, {
  ProductCardProps,
} from '../../components/common/product/ProductCard';
import Pagination from '../../components/common/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import { categoryData } from './data';
import { useQuery } from '@tanstack/react-query';
import apiProducts from '../../apis/apiProducts';
const PAGE = 1,
  OFFSET = 1;
const Home: FC = memo(() => {
  console.log(`render home`);

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(PAGE);
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    console.log(`current page = ${currentPage}`);
    // refetch();
  };
  const goToPage = (newPage: number) => {
    setCurrentPage(prev => newPage);
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    console.log(`current page = ${currentPage}`);
    // refetch();
  };
  // console.log(categoryData);
  const {
    data: products,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['products', currentPage],
    // notifyOnChangeProps: 'all',
    queryFn: async () => {
      console.log(`call api, ${currentPage}`);

      return await apiProducts.getProducts(currentPage, OFFSET);
    },
  });
  // console.log(`products`, products);

  return (
    <main className="min-h-screen px-20 my-5">
      <h1 className="text-3xl text-center font-medium">
        {t('category.title')}
      </h1>
      {/* Image container */}
      <div className="flex flex-col md:flex-row items-center justify-evenly text-base space-x-2 my-8 border-b-2 pb-8 border-b-gray-300">
        {categoryData.map((category) => (
          <CategoryCard
            key={category.id}
            srcImage={category.srcImage}
            categoryName={t(category.categoryName)}
          />
        ))}
        {/* <CategoryCard
          srcImage={cateImage1}
          categoryName={t('category.anniversary')}
        />
        <CategoryCard
          srcImage={cateImage2}
          categoryName={t('category.women')}
        />
        <CategoryCard srcImage={cateImage3} categoryName={t('category.men')} />
        <CategoryCard
          srcImage={cateImage4}
          categoryName={t('category.children')}
        />
        <CategoryCard
          srcImage={cateImage5}
          categoryName={t('category.family')}
        />
        // <CategoryCard
        //   srcImage={cateImage6}
        //   categoryName={t('category.unique')}
        // /> */}
      </div>
      {/* Product list */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isSuccess &&
          products.map((product: ProductCardProps, index: number) => (
            <ProductCard key={index} {...product} />
          ))}
      </div>

      <Pagination
        currentPage={PAGE}
        goToLeft={goToPreviousPage}
        goToRight={goToNextPage}
        goToPage={goToPage}
      />
    </main>
  );
});

export default Home;
