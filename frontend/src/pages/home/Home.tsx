import { FC, memo } from 'react';
import CategoryCard from '../../components/common/category/CategoryCard';
// Product images
import productImage1 from '../../assets/images/product/item1.png';
import ProductCard from '../../components/common/product/ProductCard';
import Pagination from '../../components/common/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import { categoryData, productData } from './data';
const Home: FC = memo(() => {
  const { t } = useTranslation();
  console.log(categoryData);

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
        {productData.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>

      <Pagination />
    </main>
  );
});

export default Home;
