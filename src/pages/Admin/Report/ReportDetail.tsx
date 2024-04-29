import { FC, memo } from "react";
import CommentReport from "./CommentReport";
import OrderReport from "./OrderReport";
import ProductReport from "./ProductReport";

const ReportDetail: FC = memo(() => {
  const type = "";

  return type === "comment" ? (
    <CommentReport />
  ) : type === "product" ? (
    <ProductReport />
  ) : (
    <OrderReport />
  );
});

export default ReportDetail;
