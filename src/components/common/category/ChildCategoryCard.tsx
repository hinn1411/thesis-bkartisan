import { memo, FC } from "react";
import { useNavigate } from "react-router-dom";
export interface ChildCategoryCardProps {
  id: number;
  name: string;
  image: string;
  level: number;
}
const ChildCategoryCard: FC<ChildCategoryCardProps> = ({
  id,
  name,
  image,
  level,
}) => {
  const navigate = useNavigate();
  return (
    <li
    onClick={() => navigate(`/search?name=${id}`)}
     className="hover:cursor-pointer">
      <figure className="inline-block space-y-2">
        <img
          className="object-cover w-[150px] h-[150px] rounded-full duration-200 hover:scale-105"
          src={image}
          alt="category image"
        />
        <figcaption className="text-center font-medium ">{name}</figcaption>
      </figure>
    </li>
  );
};

export default ChildCategoryCard;
