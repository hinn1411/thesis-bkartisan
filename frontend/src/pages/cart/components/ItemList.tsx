import { FC, memo } from 'react';
import ItemCard from './ItemCard';
const ItemList: FC = memo(() => {
  return (
    <div>
      <p>List of Items</p>
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
});

export default ItemList;
