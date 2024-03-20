import { FC, memo } from "react";
import { Box } from "@mui/system";
import { Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface HandledProductProps {
  avatar: string;
  name: string;
  seller: string;
  date: string;
  status: string;
  color: string;
}

const HandledProductItem: FC<HandledProductProps> = memo(({avatar, name, seller, date, status, color}) => {

  return (
    <Box display={"flex"} py={1} bgcolor={color}>
      <Box display={"flex"} className="basis-2/6" gap={5} paddingX={3}>
        <Avatar src={avatar} sx={{ width: "3.5rem", height: "3.5rem"}} />
        <Box alignSelf={"center"}>{name}</Box>
      </Box>
      <Box alignSelf={"center"} className="basis-3/12">
        {seller}
      </Box>
      <Box alignSelf={"center"} className="basis-1/6">
        {date}
      </Box>
      <Box alignSelf={"center"} className="basis-1/12">
        {status}
      </Box>
      <Box display="flex" alignSelf={"center"} px={3} className="basis-2/12" justifyContent="center">
        <Link to="jjjj">
          <Button variant="contained" size="small" color="inherit" onClick={() => console.log(name)}>
            Xem
          </Button>
        </Link>
      </Box>
    </Box>
  );
});

export default HandledProductItem;
