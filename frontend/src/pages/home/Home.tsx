import { FC, memo } from 'react';
import CategoryCard from '../../components/common/category/CategoryCard';
// Category images
import cateImage1 from '../../assets/images/category/img.png';
import cateImage2 from '../../assets/images/category/img2.png';
import cateImage3 from '../../assets/images/category/img3.png';
import cateImage4 from '../../assets/images/category/img4.png';
import cateImage5 from '../../assets/images/category/img5.png';
import cateImage6 from '../../assets/images/category/img6.png';
// Product images
import productImage1 from '../../assets/images/product/item1.png';
import ProductCard from '../../components/common/product/ProductCard';
import Pagination from '../../components/common/pagination/Pagination';
import { useTranslation } from 'react-i18next';
const Home: FC = memo(() => {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen px-20 my-5">
      <h1 className="text-3xl text-center font-medium">
        {t('category.title')}
      </h1>
      {/* Image container */}
      <div className="flex flex-col md:flex-row items-center justify-evenly text-base space-x-2 my-8 border-b-2 pb-8 border-b-gray-300">
        <CategoryCard
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
        <CategoryCard
          srcImage={cateImage6}
          categoryName={t('category.unique')}
        />
      </div>
      {/* Product container - Should be replace by 
      <ProductList /> component in future */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={true}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={false}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={false}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={true}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={false}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={true}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={false}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={false}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={false}
        />
        <ProductCard
          srcImage={productImage1}
          name="Christmas suncatcher stained glass..."
          star={4.7}
          seller="sadboizaintcry"
          numOfRating={113}
          currentCost={123000}
          originalCost={300000}
          percentageOfDiscount={45}
          isNew={true}
        />
      </div>

      <Pagination />
    </main>
  );
});

export default Home;
