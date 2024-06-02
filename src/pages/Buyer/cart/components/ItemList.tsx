import { FC, memo } from "react";
import ItemCard, { ItemCardProps } from "./ItemCard";
import Spinner from "@components/common/ui/Spinner";
import GiftCard, { GiftCardProps } from "./GiftCard";
// import ItemCard from './ItemCard';

export interface ItemListProps {
  className?: string;
  isLoading: boolean;
  data: (ItemCardProps | GiftCardProps)[];
}
const ItemList: FC<ItemListProps> = memo(({ className, isLoading, data }) => {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ul className={className}>
      {data.map((item: ItemCardProps | GiftCardProps, index: number) => {
        const { isGift } = item;
        if (!isGift) {
          return <ItemCard key={index} {...item} />;
        } else {
          return <GiftCard key={index} {...item} />;
        }
      })}
    </ul>
  );
});

export default ItemList;
