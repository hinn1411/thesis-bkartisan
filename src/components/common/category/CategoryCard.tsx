import { FC, memo } from 'react';

interface CategoryCardProps {
  srcImage: string;
  categoryName: string;
}
const CategoryCard: FC<CategoryCardProps> = memo(
  ({ srcImage, categoryName }) => {
    return (
      <div className="flex flex-col justify-center items-center space-y-2">
        <img src={srcImage} alt="category image" />
        <div className="text-center">{categoryName}</div>
      </div>
    );
  }
);

export default CategoryCard;
