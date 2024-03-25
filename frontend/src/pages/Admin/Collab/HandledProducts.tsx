import { FC, Fragment, memo, useState } from "react";
import DropdownSelect from "../../../components/admin/DropdownSelect";
import { Button, Box } from "@mui/material";
import SearchInput from "../../../components/admin/SearchInput";
import HandledProductItem from "../../../components/admin/listitem/HandledProductItem";
import { useLocation } from "react-router-dom";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";


const HandledProducts: FC = memo(() => {
  const { name } = useLocation().state;

  const [dateFilter, setDateFilter] = useState(0);
  const optionDateFilter = ["Mới nhất", "Sớm nhất"];

  const [status, setStatus] = useState(0);
  const optionStatus = ["Chấp nhận", "Từ chối"];

  const foo = (val) => {
    console.log(val);
  };

  const arr = [
    {
      avatar: img_example,
      name: "Đồng hồ",
      seller: "Lầu Hội",
      date: "1/1/1111",
      status: "Chấp nhận",
    },
    {
      avatar: img_example,
      name: "Đồng hồ",
      seller: "Lầu Hội",
      date: "1/1/1111",
      status: "Chấp nhận",
    },
    {
      avatar: img_example,
      name: "Đồng hồ",
      seller: "Lầu Hội",
      date: "1/1/1111",
      status: "Chấp nhận",
    },
  ];

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">
        Danh sách sản phẩm được duyệt bởi {name}
      </h1>
      <Box display={"flex"} py={3} justifyContent={"space-between"}>
        <Box display={"flex"} gap={2}>
          <div className="text-base">Thời gian duyệt:</div>
          <DropdownSelect values={optionDateFilter} setValue={setDateFilter} />
          <div className="text-base">Trạng thái:</div>
          <DropdownSelect values={optionStatus} setValue={setStatus} />
        </Box>

        <Box display="flex" px={2} gap={2}>
          <SearchInput
            placeholder="Nhập tên sản phẩm"
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
        <Box className="basis-2/6 px-28">Tên sản phẩm</Box>
        <Box className="basis-3/12">Người đăng</Box>
        <Box className="basis-1/6">Ngày duyệt</Box>
        <Box>Trạng thái</Box>
      </Box>

      {arr.map((element, index) => {
        return (
          <HandledProductItem
            key={index}
            color={index % 2 == 0 ? "#F2F6FC" : "white"}
            {...element}
          />
        );
      })}
    </Fragment>
  );
});

export default HandledProducts;
