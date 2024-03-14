import { FC, Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface UserProps {
  avatar: string;
  name: string;
  gender: string;
  phone: string;
  email: string;
  color: string;
}

const User: FC<UserProps> = memo(({avatar, name, gender, phone, email, color}) => {

  return (
    <Box display={"flex"} py={1} bgcolor={color}>
      <Box display={"flex"} className="basis-2/6" gap={5} paddingX={3}>
        <Avatar src={avatar} sx={{ width: "3.5rem", height: "3.5rem"}} />
        <Box alignSelf={"center"}>{name}</Box>
      </Box>
      <Box alignSelf={"center"} className="basis-1/6">
        {gender}
      </Box>
      <Box alignSelf={"center"} className="basis-1/6">
        {phone}
      </Box>
      <Box alignSelf={"center"} className="basis-1/6">
        {email}
      </Box>
      <Box alignSelf={"center"} px={3}>
        <Link to="jjjj">
          <Button variant="contained" size="small" color="inherit" onClick={() => console.log(name)}>
            Xem
          </Button>
        </Link>
      </Box>
    </Box>
  );
});

export default User;
