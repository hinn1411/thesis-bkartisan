import { FC, Fragment, memo, useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import SearchInput from "../../../components/admin/SearchInput";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Filter from "../../../components/admin/Filter";
import UserItem from "../../../components/admin/ListItem";

const img_example =
  "https://st5.depositphotos.com/4428871/67037/i/450/depositphotos_670378628-stock-photo-examples-text-quote-concept-background.jpg";

const ProductManagement: FC = memo(() => {
  const [openFilter, setFilter] = useState(false);

  const foo = (val) => {
    console.log(val);
  };

  const arr = [
    [img_example, "Lầu Hội", "Chưa xác định", "Chưa xác định", "20/10/2002"],
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
    [img_example, "Lầu Hội", "Lầu Hội", "0123456789", "20/10/2002"],
  ]

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
          {/**Product */}

          <Grid
            container
            className={"text-slate-600 text-lg font-medium p-2 py-5"}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              Tên sản phẩm
            </Grid>
            <Grid item xs={3}>
              Người đăng
            </Grid>
            <Grid item xs={2}>
              Giá
            </Grid>
            <Grid item xs={2}>
              Ngày duyệt
            </Grid>
          </Grid>
          <hr className="border" />

          {arr.map((element, index) => {
            if (index !== arr.length - 1)
              return <UserItem key={index} type="product" values={element} />;
            else
              return (
                <UserItem
                  key={index}
                  type="product"
                  values={element}
                  color="bg-[#F2F6FC]"
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
