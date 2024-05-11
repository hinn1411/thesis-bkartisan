import { FC, memo } from 'react';
import ItemCard, { ItemCardProps } from './ItemCard';
import Spinner from '@components/common/ui/Spinner';
// import ItemCard from './ItemCard';

export interface ItemListProps {
  className?: string;
  isLoading: boolean;
  data: ItemCardProps[];
}
const ItemList: FC<ItemListProps> = memo(({ className, isLoading, data }) => {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ul className={className}>
      {data.map((item: ItemCardProps, index: number) => (
        <ItemCard key={index} {...item} />
      ))}
    </ul>
  );
});

export default ItemList;
