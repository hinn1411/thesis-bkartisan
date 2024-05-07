import { FC, memo } from 'react';

import FavoriteCard, { FavoriteCardProps } from './FavoriteCard';
import { Spinner } from 'flowbite-react';

export interface FavoriteCardListProps {
  className?: string;
  isLoading: boolean;
  data: FavoriteCardProps[];
}

const FavoriteCardList: FC<FavoriteCardListProps> = memo(
  ({ className, isLoading, data }) => {
    let style = 'grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
    if (className) {
      style = className;
    }
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <ul className={style}>
        {data.map((item) => (
          <FavoriteCard key={item.id} {...item} />
        ))}
      </ul>
    );
  }
);

export default FavoriteCardList;
