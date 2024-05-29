import { FC, memo } from "react";
import { Table } from "flowbite-react";
import ItemRow, { ItemRowProps } from "./ItemRow";

export interface ShippingCostTableProps {
  items: Array<ItemRowProps>;
}

const ShippingCostTable: FC<ShippingCostTableProps> = memo(({ items }) => {
  return (
    <Table>
      <Table.Head className="text-md normal-case text-black">
        <Table.HeadCell>Quốc gia</Table.HeadCell>
        <Table.HeadCell>Phí vận chuyển</Table.HeadCell>
        <Table.HeadCell>Phí thêm cho mỗi sản phẩm</Table.HeadCell>
        <Table.HeadCell>Thời gian giao hàng</Table.HeadCell>
        {/* <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell> */}
      </Table.Head>
      <Table.Body className="divide-y">
        {items.map((item: ItemRowProps, index: number) => (
          <ItemRow key={index} {...item} />
        ))}
      </Table.Body>
    </Table>
  );
});

export default ShippingCostTable;
