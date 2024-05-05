import { FC, memo } from 'react';
import ProductCard, { ProductCardProps } from './ProductCard';
import ProductSkeleton, { ProductSkeletonList } from './ProductSkeleton';

export interface ProductListProps {
  data: ProductCardProps[];
  isLoading: boolean;
}

const ProductList: FC<ProductListProps> = memo(({ isLoading, data }) => {
  if (isLoading) {
    return (
      <ProductSkeletonList
        className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        numberOfElement={20}
      />
    );
  }
  return (
    <ul className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((product: ProductCardProps, index: number) => (
        <ProductCard key={index} {...product} />
      ))}
    </ul>
  );
});

export default ProductList;
