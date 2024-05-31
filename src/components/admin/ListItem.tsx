import { FC, memo } from "react";
import { Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { formatDate } from "../../utils/formatDate";
interface ListProps {
  type:
    | "user"
    | "collab"
    | "product"
    | "report"
    | "handled-report"
    | "handled-product"
    | "order";
  values: string[];
  className?: string;
}

const USER_LAYOUT = [1, 3, 2, 2, 3, 1];
const PRODUCT_LAYOUT = [1, 3, 3, 2, 2, 1];
const REPORT_LAYOUT = [1, 3, 3, 1.5, 2.5, 1];
const ORDER_LAYOUT = [2, 2.5, 2.5, 2, 2, 1];
const HANDLED_REPORT_LAYOUT = [1.5, 3, 3, 2.5, 2];

const ListItem: FC<ListProps> = memo(({ type, values, className }) => {
  const navigate = useNavigate();

  let layout: number[];
  switch (type) {
    case "user":
    case "collab":
      layout = USER_LAYOUT;
      break;
    case "product":
      layout = PRODUCT_LAYOUT;
      break;
    case "report":
      layout = REPORT_LAYOUT;
      break;
    case "order":
      layout = ORDER_LAYOUT;
      break;
    default:
      layout = HANDLED_REPORT_LAYOUT;
      break;
  }

  const onPress = () => {
    if (type === "handled-product" || type === "handled-report") {
      navigate(`/admin/products/${values[values.length - 1]}`);
    }
    else if (type === "user") {
      navigate(`/admin/users/${values[values.length - 1]}`);
    }
    else {
      navigate(`${values[values.length - 1]}`);
    }
  };

  return (
    <Grid
      container
      className={
        "border-b-2 hover:shadow-lg hover:border-x-2 p-2 hover:bg-neutral-50 " +
        (className || "")
      }
      alignItems="center"
    >
      {layout.map((value, index) => {
        if (index === layout.length - 1) {
          return (
            <Grid
              item
              xs={layout[index]}
              key={index}
              className="flex justify-center"
            >
              <Button color="gray" size={"md"} onClick={onPress}>
                Xem
              </Button>
            </Grid>
          );
        } else if (index === 0 && (type === "product" || type === "user" || type === "collab")) {
          return (
            <Grid item xs={layout[index]} key={index}>
              <Avatar
                src={values[index]}
                sx={{ width: "3.5rem", height: "3.5rem" }}
              />
            </Grid>
          );
        } else if (
          index === 0 &&
          (type === "report" || type === "handled-report")
        ) {
          return (
            <Grid item xs={layout[index]} key={index}>
              <div className="w-16">{values[index] || "Chưa xác định"}</div>
            </Grid>
          );
        } else if (index === 0 && type === "order") {
          return (
            <Grid item xs={layout[index]} key={index}>
              <div className="text-center">
                {values[index] || "Chưa xác định"}
              </div>
            </Grid>
          );
        } else if (index == 2 && (type === "user" || type === "collab")) {
          return (
            <Grid item xs={layout[index]} key={index}>
              {values[index] === "M"
                ? "Nam"
                : values[index] === "F"
                ? "Nữ"
                : "Chưa xác định"}
            </Grid>
          );
        } else if (
          index == 4 &&
          (type == "handled-product" || type == "product")
        ) {
          return (
            <Grid item xs={layout[index]} key={index}>
              <div className="truncate mr-8">
                {formatDate("dd/mm/yyyy", new Date(values[index])) ||
                  "Chưa xác định"}
              </div>
            </Grid>
          );
        } else if (index == 4 && type == "report") {
          return (
            <Grid item xs={layout[index]} key={index}>
              <div className="truncate mr-8">
                {formatDate("hh:MM dd/mm/yyyy", new Date(values[index])) ||
                  "Chưa xác định"}
              </div>
            </Grid>
          );
        } else if (index == 4 && type == "order") {
          return (
            <Grid item xs={layout[index]} key={index}>
              <div className="truncate mr-8">
                {formatDate("dd/mm/yyyy", new Date(values[index])) ||
                  "Chưa xác định"}
              </div>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={layout[index]} key={index}>
              <div className="truncate mr-8">
                {values[index] || "Chưa xác định"}
              </div>
            </Grid>
          );
        }
      })}
    </Grid>
  );
});

export default ListItem;
