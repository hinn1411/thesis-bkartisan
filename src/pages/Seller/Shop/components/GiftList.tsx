import { FC, memo } from "react";
import GiftItem, {GiftItemProps} from "./GiftItem";
import { ProductSkeletonList } from "@components/common/product/ProductSkeleton";

export interface GiftListProps {
  data: GiftItemProps[];
  isLoading: boolean;
}

const GiftList: FC<GiftListProps> = memo(({ isLoading, data }) => {
  if (isLoading) {
    return (
      <ProductSkeletonList
        className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        numberOfElement={20}
      />
    );
  }
  return (
    <ul className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((product: GiftItemProps, index: number) => (
        <GiftItem key={index} {...product} />
      ))}
    </ul>
  );
});

export default GiftList;
