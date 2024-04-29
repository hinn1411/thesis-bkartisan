import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    RightOutlined
  } from '@ant-design/icons';

interface CategoryLinkProps {
    linkTo: string;
    categoryName: string;
  }

const CategoryLink: FC<CategoryLinkProps> = memo(
    ({ linkTo, categoryName }) => {
      return (
        <div className='flex items-center space-x-2 md:space-x-5 '>
            <Link to={linkTo}> <p className='hover:text-orange-600 '>{categoryName}</p> </Link>
            <RightOutlined></RightOutlined>
        </div>
      );
    }
  );
  
  export default CategoryLink;