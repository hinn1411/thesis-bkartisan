import { FC, memo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQueryURL } from '@hooks/useQueryURL';
import CategoryCard from '@components/common/category/CategoryCard';
import ChildCategoryCard from '@components/common/category/ChildCategoryCard';
import { LEVELS } from 'src/constants/categories';
import ChildCategoryCardSkeleton, {
  ChildCategoryCardSkeletonList,
} from '@components/common/category/ChildCategoryCardSkeleton';
import { useCategoryChildren } from '@hooks/useCategoryChildren';
import { CategoryCardSkeletonList } from '@components/common/category/CategoryCardSkeleton';
const Category: FC = memo(() => {
  const { id, level, name } = useQueryURL();
  const { data: categories, isFetching } = useCategoryChildren(id);
  console.log(`id = ${id}, level = ${level}`);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('id'));
  return (
    <main className="min-h-screen px-20 my-5 md:mx-[10%]">
      {/* Parent Category */}
      <h1 className="font-medium text-center text-3xl">{decodeURIComponent(name)}</h1>
      {isFetching ? (
        level == LEVELS.GRANDPARENT ? (
          <CategoryCardSkeletonList numberOfElement={5} />
        ) : (
          <ChildCategoryCardSkeletonList numberOfElement={5} />
        )
      ) : (
        <ul className="flex flex-col flex-wrap justify-center items-center mt-6   md:space-y-0 md:flex-row md:space-x-12">
          {level == LEVELS.GRANDPARENT &&
            categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          {level == LEVELS.PARENT &&
            categories.map((category) => (
              <ChildCategoryCard key={category.id} {...category} />
            ))}
        </ul>
      )}
    </main>
  );
});

export default Category;
