import { FC, memo } from 'react';

interface CategoryCardProps {
  srcImage: string;
  categoryName: string;
}
const CategoryCard: FC<CategoryCardProps> = memo(
  ({ srcImage, categoryName }) => {
    return (
      <li className="group hover:cursor-pointer flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-2">
          <img
            src={srcImage}
            alt="category image"
            className="object-cover w-[150px] h-[150px] rounded-[10px] hover:scale-105 duration-300"
          />
          <span className="text-center font-medium">{categoryName}</span>
        </div>
        <div className="mx-2 mt-0 w-full duration-500 border-b-2 opacity-0 border-black border-1 group-hover:opacity-100"></div>
      </li>
    );
  }
);

export default CategoryCard;
