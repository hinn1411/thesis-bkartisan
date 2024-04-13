import { FC, memo } from "react";
import { Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

interface ListProps {
  type:
    | "user"
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
      layout = USER_LAYOUT;
      break;
    case "product" || "handled-product":
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
    } else {
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
        } else if (index === 0 && (type === "product" || type === "user")) {
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
        } else {
          return (
            <Grid item xs={layout[index]} key={index}>
              {values[index] || "Chưa xác định"}
            </Grid>
          );
        }
      })}
    </Grid>
  );
});

export default ListItem;
