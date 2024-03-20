import { FC, Fragment, memo, useState } from "react";
import DropdownSelect from "../../../components/admin/DropdownSelect";
import { Button, Box } from "@mui/material";
import SearchInput from "../../../components/admin/SearchInput";
import UserItem from "../../../components/admin/listitem/UserItem";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const UserManagement: FC = memo(() => {
  const [dateFilter, setDateFilter] = useState(0);
  const optionDateFilter = ["Mới nhất", "Sớm nhất"];

  const [status, setStatus] = useState(0);
  const optionStatus = ["Toàn bộ", "Bình thường", "Tạm khóa"];

  const foo = (val) => {
    console.log(val);
  };

  const arr = [
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
  ]

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách người dùng</h1>
      <Box display={"flex"} py={3} justifyContent={"space-between"}>
        <Box display={"flex"} gap={2}>
          <div className="text-base">Ngày tạo:</div>
          <DropdownSelect values={optionDateFilter} setValue={setDateFilter} />
          <div className="text-base">Tình trạng:</div>
          <DropdownSelect values={optionStatus} setValue={setStatus} />
        </Box>

        <Box display="flex" px={2} gap={2}>
          <SearchInput
            placeholder="Nhập tên người dùng"
            ariaLabel="Fooo"
            handleEnter={foo}
          />
          <Button variant="contained">Tìm kiếm</Button>
        </Box>
      </Box>
      <hr style={{ borderWidth: "0.01rem" }} />
      <Box
        display={"flex"}
        py={2}
        className={"text-slate-600 text-lg font-medium"}
      >
        <div className="basis-2/6 px-28">Tên</div>
        <div className="basis-1/6">Giới tính</div>
        <div className="basis-1/6">SĐT</div>
        <div className="basis-2/6">Email</div>
      </Box>

      {
        arr.map((element, index) => {
          return <UserItem key={index} color={index % 2 == 0 ? "#F2F6FC" : "white"} {...element}/>
        })
      }
      
      
    </Fragment>
  );
});

export default UserManagement;
