import { FC, Fragment, memo, useState } from "react";
import DropdownSelect from "../../../components/admin/DropdownSelect";
import { Button, Box, Grid } from "@mui/material";
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
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
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
      {/* <Box
        display={"flex"}
        py={2}
        className={"text-slate-600 text-lg font-medium"}
      >
        <div className="basis-2/6 px-28">Tên</div>
        <div className="basis-1/6">Giới tính</div>
        <div className="basis-1/6">SĐT</div>
        <div className="basis-2/6">Email</div>
      </Box> */}

      {/**User */}

      {/* <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>Tên</Grid>
        <Grid item xs={2}>Giới tính</Grid>
        <Grid item xs={2}>SĐT</Grid>
        <Grid item xs={2}>Email</Grid>
      </Grid>
      <hr className="border"/>

      {
        arr.map((element, index) => {
          return <UserItem key={index} type="user" values={element}/>
        })
      } */}

      {/**Product */}

      <Grid container className={"text-slate-600 text-lg font-medium p-2 py-5"}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>Tên sản phẩm</Grid>
        <Grid item xs={3}>Người đăng</Grid>
        <Grid item xs={2}>Giá</Grid>
        <Grid item xs={2}>Ngày duyệt</Grid>
      </Grid>
      <hr className="border"/>

      {
        arr.map((element, index) => {
          if (index !== arr.length - 1)
          return <UserItem key={index} type="product" values={element}/>
          else
          return <UserItem key={index} type="product" values={element} color="bg-[#F2F6FC]"/>
        })
      }
      
      
    </Fragment>
  );
});

export default UserManagement;
