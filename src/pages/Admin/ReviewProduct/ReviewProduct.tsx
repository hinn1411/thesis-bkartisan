import { FC, Fragment, memo, useState } from "react";
import { Box, Grid } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Filter from "../../../components/admin/Filter";
import LoadingMessage from "../../../components/admin/LoadingMessage";
import ErrorMessage from "../../../components/admin/ErrorMessage";
import ListItem from "../../../components/admin/ListItem";
import apiProducts from "../../../apis/apiProducts";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@components/common/pagination/Pagination";

const ReviewProduct: FC = memo(() => {
  const [openFilter, setFilter] = useState(false);
  const [page, setPage] = useState(1);

  const defaultValues = {
    product: "",
    seller: "",
    startDate: null,
    endDate: null,
    startPrice: "",
    endPrice: "",
    order: "newToOld",
  };

  const options =
    JSON.parse(sessionStorage.getItem("reviewproductmanagement-filter") || "null") ||
    defaultValues;

  const [filterOpts, setFilterOpts] = useState(options);

  const { data, isPending, error } = useQuery({
    queryKey: ["review-products", page, filterOpts],
    queryFn: async () => {
      return await apiProducts.getReviewProductsList(page, 10, filterOpts);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Fragment>
      <h1 className="text-3xl font-bold">Danh sách sản phẩm cần duyệt</h1>
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
              Trạng thái
            </Grid>
            <Grid item xs={2}>
              Ngày gửi
            </Grid>
          </Grid>
          <hr className="border" />

          {isPending ? (
            <LoadingMessage />
          ) : error ? (
            <ErrorMessage msg={error.message} />
          ) : data.length === 0 ? (
            <ErrorMessage msg={"Không tìm thấy kết quả trùng khớp"} />
          ) : (
            data.map((element: any, index: number) => {
              if (element[3] === "Từ chối") {
                return <ListItem key={index} type="product" values={element} className="bg-[#F2F6FC] hover:bg-[#F2F6FC] text-red-500"/>;
              }
              return <ListItem key={index} type="product" values={element} />;
            })
          )}
          <Pagination currentPage={page} goToPage={setPage} />
        </>
      ) : (
        <Filter
          filterOpts={filterOpts}
          setFilterOpts={setFilterOpts}
          defaultValues={defaultValues}
          setOpen={setFilter}
          isProductPage={false}
        />
      )}
    </Fragment>
  );
});

export default ReviewProduct;
