import { FC, memo } from "react";
import OrderItem, { OrderItemProps } from "./OrderItem";
import Spinner from "@components/common/ui/Spinner";

export interface OrderListProps {
  className?: string;
  data: OrderItemProps[];
  isLoading: boolean;
}

const OrderList: FC<OrderListProps> = memo(({ isLoading, data, className }) => {
  let style = "";
  if (className) {
    style = className;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ul className={style}>
      {data.map((item: OrderItemProps, index) => (
        <OrderItem key={index} {...item} />
      ))}
    </ul>
  );
});

export default OrderList;
