import { FC, memo } from 'react';

interface CategoryCardProps {
  srcImage: string;
  categoryName: string;
}
const CategoryCard: FC<CategoryCardProps> = memo(
  ({ srcImage, categoryName }) => {
    return (
      <div className="group hover:cursor-pointer flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-2">
          <img
            src={srcImage}
            alt="category image"
            className="hover:scale-110 duration-300"
          />
          <div className="text-center font-medium">{categoryName}</div>
        </div>
        <div className="mx-2 mt-0 w-full duration-500 border-b-2 opacity-0 border-black border-2 group-hover:opacity-100"></div>
      </div>
    );
  }
);

export default CategoryCard;
