import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

export type CategoryTextProps = {
  className?: string;
  id: number;
  name: string;
  level: number;
};

const CategoryText: FC<CategoryTextProps> = memo(
  ({ id, name, level, className }) => {
    let style = 'block px-4 py-2 hover:bg-gray-100';
    if (className) {
      style = className;
    }
    return (
      <Link to={`/category?id=${id}&level=${level}&name=${encodeURIComponent(name)}`}>
        <p className={`${style}`}>{name}</p>
      </Link>
    );
  }
);

export default CategoryText;
