import { FC, memo } from 'react';
import { Table } from 'flowbite-react';
import ItemRow from './ItemRow';
import { formatCurrency } from '@utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';

export interface OrderTableProps {
  items: Array<any>;
  seller: string;
  discountPrice: number;
}

const OrderTable: FC<OrderTableProps> = memo(
  ({ seller, items, discountPrice }) => {
    const formattedDiscount = formatCurrency(
      discountPrice,
      CURRENCIES.VIETNAMDONG
    );
    return (
      <Table>
        <Table.Head className="text-md normal-case text-black">
          <Table.HeadCell>Sản phẩn</Table.HeadCell>
          <Table.HeadCell>Đơn giá</Table.HeadCell>
          <Table.HeadCell>Số lượng</Table.HeadCell>
          <Table.HeadCell>Thành tiền</Table.HeadCell>
          {/* <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y">
          {items.map((item: any, index: number) => (
            <ItemRow key={index} {...item} />
          ))}
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell></Table.Cell>
            <Table.Cell className="font-semibold text-black">
              Mã giảm giá
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>-{formattedDiscount}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell></Table.Cell>
            <Table.Cell className="font-semibold text-black">
              Phí vận chuyển
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>-{0}đ</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell></Table.Cell>
            <Table.Cell className="font-semibold text-black">
              Tổng tiền
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{0}đ</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
);

export default OrderTable;
