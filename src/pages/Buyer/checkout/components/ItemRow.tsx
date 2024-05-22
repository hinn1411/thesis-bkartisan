import { FC, memo } from 'react';
import { Table } from 'flowbite-react';
import { formatCurrency } from '@utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';
export interface ItemRowProps {
  productImage: string;
  productName: string;
  finalPrice: number;
  quantity: number;
}

const ItemRow: FC<ItemRowProps> = memo(
  ({ productImage, productName, finalPrice, quantity }) => {
    const pricePerItem = formatCurrency(finalPrice, CURRENCIES.VIETNAMDONG);
    const totalPrice = formatCurrency(
      finalPrice * quantity,
      CURRENCIES.VIETNAMDONG
    );
    const formattedName = productName.slice(0, 20) + '...' ;
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 flex items-center space-x-2">
          <img className="object-cover w-6 h-6" src={productImage} />
          <p className="">{formattedName}</p>
        </Table.Cell>
        <Table.Cell>{pricePerItem}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>

        <Table.Cell>{totalPrice}</Table.Cell>
      </Table.Row>
    );
  }
);

export default ItemRow;
