import { FC, memo } from "react";
import { Box } from "@mui/system";
import { Button, Avatar, Grid } from "@mui/material";
import { Link } from "react-router-dom";

interface UserProps {
  type: "user" | "product" | "report-or-order" | "handled-report";
  values: string[];
  color?: string;
}

const USER_LAYOUT = [1, 3, 2, 2, 3, 1];
const PRODUCT_LAYOUT = [1, 3, 3, 2, 2, 1];
const REPORT_OR_ORDER_LAYOUT = [1, 3, 2, 2, 3, 1];
const HANDLED_REPORT_LAYOUT = [1, 3, 2, 2, 3, 1];

const UserItem: FC<UserProps> = memo(({ type, values, color }) => {
  let layout: number[];
  switch (type) {
    case "user":
      layout = USER_LAYOUT;
      break;
    case "product":
      layout = PRODUCT_LAYOUT;
      break;
    case "report-or-order":
      layout = REPORT_OR_ORDER_LAYOUT;
      break;
    default:
      layout = HANDLED_REPORT_LAYOUT;
      break;
  }

  return (
    // <Box display={"flex"} py={1} bgcolor={color}>
    //   <Box display={"flex"} className="basis-2/6" gap={5} paddingX={3}>
    //     <Avatar src={avatar} sx={{ width: "3.5rem", height: "3.5rem"}} />
    //     <Box alignSelf={"center"}>{name}</Box>
    //   </Box>
    //   <Box alignSelf={"center"} className="basis-1/6">
    //     {gender}
    //   </Box>
    //   <Box alignSelf={"center"} className="basis-1/6">
    //     {phone}
    //   </Box>
    //   <Box alignSelf={"center"} className="basis-1/6">
    //     {email}
    //   </Box>
    //   <Box alignSelf={"center"} px={3}>
    //     <Link to="jjjj">
    //       <Button variant="contained" size="small" color="inherit" onClick={() => console.log(name)}>
    //         Xem
    //       </Button>
    //     </Link>
    //   </Box>
    // </Box>
    <Grid
      container
      className={
        "border-b-2 hover:shadow-lg hover:border-x-2 p-2 " + (color || "hover:bg-neutral-50")
      }
      alignItems="center"
    >
      {/* <Grid item xs={1}>
        <Avatar src={avatar} sx={{ width: "3.5rem", height: "3.5rem" }} />
      </Grid>
      <Grid item xs={3}>
        Tên
      </Grid>
      <Grid item xs={2}>
        Giới tính
      </Grid>
      <Grid item xs={2}>
        SĐT
      </Grid>
      <Grid item xs={3}>
        Email
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          size="small"
          color="inherit"
          onClick={() => console.log(name)}
        >
          Xem
        </Button>
      </Grid> */}
      {layout.map((value, index) => {
        if (index === layout.length - 1) {
          return (
            <Grid item xs={1} key={index}>
              <Button
                variant="contained"
                size="small"
                color="inherit"
                onClick={() => console.log("name")}
              >
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
        } else {
          return (
            <Grid item xs={layout[index]} key={index}>
              {values[index]}
            </Grid>
          );
        }
      })}
    </Grid>
  );
});

export default UserItem;
