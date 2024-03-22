import { FC, Fragment, memo, useState } from "react";
import { Button, Box } from "@mui/material";
import SearchInput from "../../../components/admin/SearchInput";
import HandledProductItem from "../../../components/admin/listitem/HandledProductItem";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Filter from "../../../components/admin/Filter";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const ProductManagement: FC = memo(() => {
  const [openFilter, setFilter] = useState(false);

  const foo = (val) => {
    console.log(val);
  };

  const product = {
    avatar: img_example,
    name: "Đồng hồ",
    seller: "Lầu Hội",
    date: "1/1/1111",
    status: "44/44/4444",
  };
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(product);
  }

  return (
    <Fragment>
      <h1 className="text-3xl font-bold">Danh sách sản phẩm</h1>
      <Box display={"flex"} py={3} justifyContent={"space-between"}>
        <div
          className="flex items-center space-x-2  drop-shadow-lg border w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200"
          onClick={() => setFilter(!openFilter)}
        >
          <CiFilter className="w-5 h-5" />
          <p>Lọc</p>
          {!openFilter ? (
            <IoIosArrowDown className="w-5 h-5" />
          ) : (
            <IoIosArrowUp className="w-5 h-5" />
          )}
        </div>

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
      {!openFilter ? (
        <>
          <Box
            display={"flex"}
            py={2}
            className={"text-slate-600 text-lg font-medium"}
          >
            <Box className="basis-2/6 px-28">Tên sản phẩm</Box>
            <Box className="basis-3/12">Người đăng</Box>
            <Box className="basis-1/6">Giá</Box>
            <Box>Ngày được duyệt</Box>
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
        </>
      ) : (
        <Filter setOpen={setFilter} />
      )}
    </Fragment>
  );
});

export default ProductManagement;
