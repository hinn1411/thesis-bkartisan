
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
export interface CategoryCardProps {
  id: number;
  image: string;
  name: string;
  level: number;
  isSelected?: boolean;
}
const CategoryCard: FC<CategoryCardProps> = memo(
  ({ id, image, name, level }) => {
    return (
      <li className="group hover:cursor-pointer flex flex-col justify-center items-center">
        <Link to={`/category?id=${id}&level=${level}&name=${name}`}>
          <figure className="flex flex-col justify-center items-center space-y-2">
            <img
              src={image}
              alt="category image"
              className="object-cover w-[150px] h-[150px] rounded-[10px] hover:scale-105 duration-300"
            />
            <figcaption className="text-center font-medium">{name}</figcaption>
          </figure>
          <div className="mx-2 mt-0 w-full duration-500 border-b-2 opacity-0 border-black border-1 group-hover:opacity-100"></div>
        </Link>
      </li>
    );
  }
);

export default CategoryCard;
