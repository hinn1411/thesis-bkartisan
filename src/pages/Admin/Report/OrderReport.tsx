import { FC, memo, useState } from "react";
import { Box, Grid } from "@mui/material";
import ReturnIcon from "../../../components/admin/ReturnIcon";
import { Button } from "flowbite-react";
import TextField from "../../../components/admin/TextField";
import { BsChatLeftDots } from "react-icons/bs";
import { formatDate } from "../../../utils/formatDate";
import ImageSlider from "src/pages/Buyer/products/components/ImageSlider";
import ImageList from "src/pages/Buyer/products/components/ImageList";
import { useNavigate } from "react-router-dom";
import ResponseModal from "@components/admin/modal/ResponseModal";
import ReportFeedback from "./ReportFeedback";
import { useRejectReport } from "./hooks/useRejectReport";

interface OrderReportProps {
  report: any;
}

const OrderReport: FC<OrderReportProps> = memo(({ report }) => {
  const navigate = useNavigate();

  const chatWithReporter = () =>
    navigate("/admin/message", {
      state: {
        username: report.reporter,
        name: report.reporterName,
        avatar: report.reporterAvatar,
      },
    });

  const chatWithReportedUser = () =>
    navigate("/admin/message", {
      state: {
        username: report.reportedUser,
        name: report.reportedUserName,
        avatar: report.reportedUserAvatar,
      },
    });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openResponseModal, setOpenResponseModal] = useState(false);

  const { mutate, isPending } = useRejectReport(report.reportId);

  return (
    <Box paddingBottom={4}>
      <ResponseModal
        type="order-report"
        id={report.reportId}
        setOpenModal={setOpenResponseModal}
        openModal={openResponseModal}
      />
      <Box display={"flex"} justifyContent="space-between">
        <h1 className="text-3xl font-bold py-3">Thông tin report mua bán</h1>
        <ReturnIcon />
      </Box>
      <Grid container p={1} columnGap={9} rowGap={3} paddingBottom={2}>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người bị report</Box>
          <TextField value={report.reportedUser} />
        </Grid>
        <Grid item xs={3.5}>
          <Box className="font-medium pb-2">Người gửi</Box>
          <TextField value={report.reporter} />
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
        <Grid item xs={6} display="flex" justifyContent="space-between">
          <Button color="light" onClick={chatWithReportedUser}>
            <BsChatLeftDots className="mr-2 h-5 w-5" /> Nhắn tin với người bị
            report
          </Button>
          <Button color="light">
            <BsChatLeftDots
              className="mr-2 h-5 w-5"
              onClick={chatWithReporter}
            />{" "}
            Nhắn tin với người gửi report
          </Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} className="font-medium pb-2">
          Hình ảnh video đi kèm:{" "}
        </Grid>
      </Grid>
      <div className="h-auto">
        <div className="px-32 h-1/2 sm:h-64 xl:h-80 2xl:h-96">
          <ImageSlider
            isLoading={false}
            data={report}
            currentSlide={currentSlide}
            setSlide={setCurrentSlide}
            parentWidth={200}
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
      {report.status === "Đã xử lý" ? (
        <ReportFeedback isOrderReport report={report} />
      ) : (
        <Box className={"mt-5 flex justify-center"}>
          <Button
            color="info"
            className="w-72 h-9 justify-self-end"
            onClick={() => setOpenResponseModal(true)}
            disabled={isPending}
          >
            Chấp nhận
          </Button>
          <Button
            color="gray"
            className="h-9 justify-self-end"
            isProcessing={isPending}
            disabled={isPending}
            onClick={() =>
              mutate({ reportId: report.reportId, accepted: false })
            }
          >
            Hủy yêu cầu
          </Button>
        </Box>
      )}
    </Box>
  );
});

export default OrderReport;
