import { FC, Fragment, memo, useState } from "react";
import DropdownSelect from "../../components/admin/DropdownSelect";
import { Button, Box } from "@mui/material";
import SearchInput from "../../components/admin/SearchInput";
import User from "../../components/admin/User";
import { IoMdAddCircleOutline } from "react-icons/io";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const CollabManagement: FC = memo(() => {
  const [dateFilter, setDateFilter] = useState(0);
  const optionDateFilter = ["Mới nhất", "Sớm nhất"];

  const arr = [
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
    {avatar:img_example, name:"Meow", gender:"meow", phone:"meow", email:"meow"},
  ]

  const foo = () => console.log("MUAHAHA")

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách cộng tác viên</h1>
      <Box display={"flex"} py={3} justifyContent={"space-between"}>
        <Box display={"flex"} gap={2}>
          <div className="text-base">Ngày tạo:</div>
          <DropdownSelect values={optionDateFilter} setValue={setDateFilter} />
        </Box>

        <Button component="div" className="gap-6" variant="contained" endIcon={<IoMdAddCircleOutline />} >Thêm cộng tác viên mới</Button>

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
        <div className="basis-2/6 px-28">Tên cộng tác viên</div>
        <div className="basis-1/6">Giới tính</div>
        <div className="basis-1/6">SĐT</div>
        <div className="basis-2/6">Email</div>
      </Box>

      {
        arr.map((element, index) => {
          return <User key={index} color={index % 2 == 0 ? "#F2F6FC" : "white"} {...element}/>
        })
      }
      
      
    </Fragment>
  );
});

export default CollabManagement;
