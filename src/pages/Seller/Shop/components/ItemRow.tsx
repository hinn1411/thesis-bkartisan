import { FC, memo } from "react";
import { Table } from "flowbite-react";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
export interface ItemRowProps {
  price: number;
  pricePerItem: number;
  location: string;
  deliveryTime: string;
}

const ItemRow: FC<ItemRowProps> = memo(
  ({ price, pricePerItem, location, deliveryTime }) => {
    const formattedPrice = formatCurrency(price, CURRENCIES.VIETNAMDONG);
    const formattedPricePerItem = formatCurrency(
      pricePerItem,
      CURRENCIES.VIETNAMDONG
    );
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{location}</Table.Cell>
        <Table.Cell>{formattedPrice}</Table.Cell>
        <Table.Cell>{formattedPricePerItem}</Table.Cell>
        <Table.Cell>{deliveryTime}</Table.Cell>
      </Table.Row>
    );
  }
);

export default ItemRow;
