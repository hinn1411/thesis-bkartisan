import { FC, memo } from "react";
import { Table } from "flowbite-react";
import ItemRow, { ItemRowProps } from "./ItemRow";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";

export interface OrderTableProps {
  info: any;
  items: Array<ItemRowProps>;
  seller: string;
  discountPrice: number;
  total: number;
}

const OrderTable: FC<OrderTableProps> = memo(
  ({ info, items, total, discountPrice }) => {
    const formattedDiscount = formatCurrency(
      discountPrice,
      CURRENCIES.VIETNAMDONG
    );
    // const formattedShippingPrice = formatCurrency(
    //   totalShippingPrice,
    //   CURRENCIES.VIETNAMDONG
    // );
    const formattedTotal = formatCurrency(total, CURRENCIES.VIETNAMDONG);
    return (
      <Table>
        <Table.Head className="text-md normal-case text-black">
          <Table.HeadCell>Sản phẩm</Table.HeadCell>
          <Table.HeadCell>Đơn giá</Table.HeadCell>
          <Table.HeadCell>Số lượng</Table.HeadCell>
          <Table.HeadCell>Thành tiền</Table.HeadCell>
          {/* <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y">
          {items.map((item: ItemRowProps, index: number) => (
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
          {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell></Table.Cell>
            <Table.Cell className="font-semibold text-black">
              Phí vận chuyển
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>-{formattedShippingPrice}</Table.Cell>
          </Table.Row> */}
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell></Table.Cell>
            <Table.Cell className="font-semibold text-black">
              Tổng tiền
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{formattedTotal}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
);

export default OrderTable;
