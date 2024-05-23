import { FC, memo } from 'react';

import { useQueryURL } from '@hooks/useQueryURL';
import { useFilter } from './hooks/useFilter';
import ProductList from '@components/common/product/ProductList';

const Search: FC = memo(() => {
  const queryObj = useQueryURL();
  const { data: products, isFetching, isError } = useFilter(queryObj);
  console.log(products);

  return (
    <main className="min-h-screen mx-4 md:mx-20 space-y-4 my-4">
      <h1 className="text-start text-xl font-sans font-medium">Tìm thấy {products.length} sản phẩm</h1>
      <ProductList data={products} isLoading={isFetching} />
      {/* {isFetching ? (
        <p>Loading</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product: ProductCardProps) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ul>
      )} */}
    </main>
  );
});

export default Search;
