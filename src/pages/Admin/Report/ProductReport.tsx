import { FC, Fragment, memo, useState } from "react";
import { Box, Grid, Rating } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { TextInput, Button, Select } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { formatDate } from "../../../utils/formatDate";
import ImageSlider from "src/pages/Buyer/products/components/ImageSlider";
import ImageList from "src/pages/Buyer/products/components/ImageList";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import { DownOutlined } from "@ant-design/icons";
import ReportFeedback from "./ReportFeedback";
interface ProductReportProps {
  report: any;
}

const ProductReport: FC<ProductReportProps> = memo(({ report }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedStates, setExpandedStates] = useState([
    false,
    false,
    false,
    true,
  ]);

  const handleButtonClick = (index: number) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  return (
    <Box paddingBottom={4}>
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin report sản phẩm</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={2} paddingBottom={2}>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người bị report</Box>
          <TextField value={report.reportedUserName} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người gửi</Box>
          <TextField value={report.reporterName} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Thời gian gửi</Box>
          <TextField
            value={formatDate("hh:MM dd/mm/yyyy", new Date(report.createdAt))}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Lí do vi phạm</Box>
          <TextField value={report.reason} />
        </Grid>
        <Grid item xs={12}>
          <Box className="font-medium pb-2">Thông tin thêm từ người report</Box>
          <TextField
            textarea
            value={report.additionalInfo}
            minHeight="min-h-28"
          />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">
            Người xử lý report
          </Box>
          <TextField value={report.handlerName} />
        </Grid>
      </Grid>
      <hr style={{ borderWidth: "0.01rem" }} />
      <Box paddingBottom={3}>
        <h1 className="text-3xl font-bold py-3 mb-3">Thông tin sản phẩm</h1>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="h-auto">
            <div className="h-48 sm:h-64 xl:h-80 2xl:h-96 w-10/12 mx-auto">
              <ImageSlider
                isLoading={false}
                data={report}
                currentSlide={currentSlide}
                setSlide={setCurrentSlide}
                parentWidth={600}
              />
            </div>
            <ImageList
              data={report}
              isLoading={false}
              className="flex mt-5 space-x-4"
              currentSlide={currentSlide}
              setSide={setCurrentSlide}
            />
          </div>
          <section className=" md:ml-10 my-2">
            <p className="text-red-700 mb-3">Hàng hiếm</p>
              <h1 className="text-2xl font-semibold">{report?.name}</h1>

            <div className="flex items-center mb-3">
              
                <p className="text-green-600 mr-1 text-xl">
                  {formatCurrency(
                    report?.currentCost as number,
                    CURRENCIES.VIETNAMDONG
                  )}
                </p>

              {report?.isOnSale > 0 && (
                <p className="text-neutral-400 line-through text-sm">
                  {formatCurrency(report?.originalCost, CURRENCIES.VIETNAMDONG)}(
                  {report?.discount}%)
                </p>
              )}
            </div>
            <p className="text-green-600 mb-2">
              Chương trình khuyến mãi được áp dụng đến 27/11/2023
            </p>
            <p>{report?.introduction}</p>
            <div className="flex items-center text-sm space-x-2 my-1">
              <a className="underline" href="#">
                {report?.seller}
              </a>

              <Rating name="read-only" value={5} readOnly />
            </div>

            <div className="my-3">
              <button
                type="button"
                className="flex items-center justify-between w-full"
                onClick={() => handleButtonClick(0)}
              >
                <p className="font-medium">Chi tiết sản phẩm</p>
                <DownOutlined
                  className={`transform ${
                    expandedStates[0] ? "rotate-180" : ""
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[0] ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="my-3">Chất liệu: Gỗ</p>
                <p>{report?.description}</p>
              </div>
            </div>

            <div className="my-3">
              <button
                type="button"
                className="flex items-center justify-between w-full"
                onClick={() => handleButtonClick(1)}
              >
                <p className="font-medium">Vận chuyển và chính sách đổi trả</p>
                <DownOutlined
                  className={`transform ${
                    expandedStates[1] ? "rotate-180" : ""
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[1] ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="my-3">
                  Lorem ipsum dolor sit amet consectetur. Sollicitudin a tellus
                  mattis eu fringilla id vestibulum egestas diam. Pellentesque
                  mauris malesuada viverra et nunc cras bibendum elementum diam.
                  Congue mollis cum duis aenean senectus est viverra at.
                </p>
              </div>
            </div>

            <div className="my-3">
              <button
                type="button"
                className="flex items-center justify-between w-full"
                onClick={() => handleButtonClick(2)}
              >
                <p className="font-medium">Câu hỏi thường gặp</p>
                <DownOutlined
                  className={`transform ${
                    expandedStates[2] ? "rotate-180" : ""
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[2] ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="my-3">
                  Lorem ipsum dolor sit amet consectetur. Sollicitudin a tellus
                  mattis eu fringilla id vestibulum egestas diam. Pellentesque
                  mauris malesuada viverra et nunc cras bibendum elementum diam.
                  Congue mollis cum duis aenean senectus est viverra at.
                </p>
              </div>
            </div>

            <div className="my-3">
              <button
                type="button"
                className="flex items-center justify-between w-full"
                onClick={() => handleButtonClick(3)}
              >
                <p className="font-medium">Gặp gỡ người bán</p>
                <DownOutlined
                  className={`transform ${
                    expandedStates[3] ? "rotate-180" : ""
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[3] ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="my-3 flex items-start space-x-4">
                  <div className="">
                    <img
                      className="object-cover w-[60px] h-[60px] rounded-[6px]"
                      src={report?.sellerImage}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-base">{report?.sellerName}</p>
                    <p className="text-sm">
                      Chủ sở hữu của{" "}
                      <a className="underline text-sm" href="#">
                        {report?.seller}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Box>
      {report.status == "Đã xử lý" ? (
        <ReportFeedback report={report} />
      ) : (
        <Grid container columnGap={1}>
          <Grid item xs={2} />
          <Grid item xs={6.5} />
          <Grid item xs={1.5}>
            <Button fullSized color="gray" className="h-9 justify-self-end">
              Hủy yêu cầu
            </Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button fullSized color="failure" className="h-9 justify-self-end">
              Xóa sản phẩm
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
});

export default ProductReport;
