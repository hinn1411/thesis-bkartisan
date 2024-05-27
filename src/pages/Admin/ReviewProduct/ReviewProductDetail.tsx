import { FC, memo } from "react";
import { HeartOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageList from "src/pages/Buyer/products/components/ImageList";
import TextSkeleton from "@components/common/skeleton/Text";
import Spinner from "@components/common/ui/Spinner";
import { Spinner as FlowbiteSpinner } from "flowbite-react";
import ImageSlider from "src/pages/Buyer/products/components/ImageSlider";
import { formatCurrency } from "../../../utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import ReturnIcon from "@components/admin/ReturnIcon";
import { Button as FlowbiteBtn } from "flowbite-react";
import ResponseModal from "@components/admin/modal/ResponseModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiProducts from "@apis/apiProducts";
import { toast } from "react-toastify";
import ErrorMessage from "@components/admin/ErrorMessage";
import { Grid } from "@mui/material";
import TextField from "@components/admin/TextField";
import { formatDate } from "@utils/formatDate";
import LoadingMessage from "@components/admin/LoadingMessage";

const ReviewProductDetail: FC = memo(() => {
  const [openResponseModal, setOpenResponseModal] = useState(false);

  const { productId } = useParams();
  if (!productId) {
    window.location.href = "/";
  }

  const queryClient = useQueryClient();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedStates, setExpandedStates] = useState([
    false,
    false,
    false,
    true,
  ]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["review-product", productId],
    queryFn: async () => {
      return await apiProducts.getReviewProductDetails(productId);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      return apiProducts.reviewProduct(...Object.values(values));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["review-product", productId],
      });
      toast.success("Thành công!");
    },
    onError: () => {
      toast.error("Đã có lỗi xảy ra! Vui lòng thử lại.");
    },
  });

  const handleButtonClick = (index: number) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  if (isFetching) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage msg={error.message} />;
  }

  console.log("Data", data);

  return (
    <div className="mx-4 md:mx-20">
      <ResponseModal
        type="reject-product"
        id={productId}
        setOpenModal={setOpenResponseModal}
        openModal={openResponseModal}
      />
      {/* Links navigation */}
      <div className="flex flex-row-reverse">
        <ReturnIcon />
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="h-auto">
          <div className="h-48 sm:h-64 xl:h-80 2xl:h-96">
            <ImageSlider
              isLoading={isFetching}
              data={data}
              currentSlide={currentSlide}
              setSlide={setCurrentSlide}
              parentWidth={600}
            />
          </div>
          <ImageList
            data={data}
            isLoading={isFetching}
            className="flex mt-5 space-x-4"
            currentSlide={currentSlide}
            setSide={setCurrentSlide}
          />
        </div>
        {/* Information product */}
        {isFetching ? (
          <div className=" flex justify-center items-center">
            <Spinner className="h-12 w-12 bg-white" />
          </div>
        ) : (
          <section className=" md:ml-10 my-2">
            <p className="text-red-700 mb-3">Hàng hiếm</p>
            {isFetching ? (
              <TextSkeleton className="h-4 w-48 rounded-full" />
            ) : (
              <h1 className="text-2xl font-semibold">{data?.name}</h1>
            )}

            <div className="flex items-center mb-3">
              {isFetching ? (
                <TextSkeleton />
              ) : (
                <p className="text-green-600 mr-1 text-xl">
                  {formatCurrency(
                    data?.currentCost as number,
                    CURRENCIES.VIETNAMDONG
                  )}
                </p>
              )}

              {data?.isOnSale > 0 && (
                <p className="text-neutral-400 line-through text-sm">
                  {formatCurrency(data?.originalCost, CURRENCIES.VIETNAMDONG)}(
                  {data?.discount}%)
                </p>
              )}
            </div>
            <p>{data?.introduction}</p>
            <div className="flex items-center text-sm space-x-2 my-1">
              <a className="underline" href="#">
                {data?.seller}
              </a>
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
                <p>{data?.description}</p>
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
                      src={data?.sellerImage}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-base">{data?.sellerName}</p>
                    <p className="text-sm">
                      Chủ sở hữu của{" "}
                      <a className="underline text-sm" href="#">
                        {data?.seller}
                      </a>
                    </p>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-xs "
                    >
                      <HeartOutlined></HeartOutlined>
                      <p>Theo dõi shop</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {data.status === "Đang bán" ? (
              <div className="flex justify-center space-x-6 w-full font-bold">
                Bài đăng này đã được thông qua.
              </div>
            ) : data.status === "Từ chối" ? (
              <div className="flex justify-center space-x-6 w-full font-bold text-red-700">
                Bài đăng này đã bị từ chối.
              </div>
            ) : (
              <div className="flex justify-center space-x-6 w-full">
                <FlowbiteBtn
                  color="success"
                  isProcessing={isPending}
                  disabled={isPending}
                  onClick={() => mutate({ id: productId, accepted: true })}
                >
                  Duyệt bài đăng
                </FlowbiteBtn>
                <FlowbiteBtn
                  color="gray"
                  onClick={() => setOpenResponseModal(true)}
                >
                  Từ chối
                </FlowbiteBtn>
              </div>
            )}
          </section>
        )}
      </div>
      {data.status === "Từ chối" && (
        <>
          <hr style={{ borderWidth: "0.01rem", marginTop: "2rem" }} />
          <h1 className="text-3xl font-bold py-4">Thông tin xử lý bài đăng</h1>
          <Grid container p={1} rowGap={3} paddingBottom={2}>
            <Grid item xs={1.5} className="font-medium pb-2">
              Thời gian xử lý:{" "}
            </Grid>
            <Grid item xs={3} marginRight={"5rem"}>
              <TextField
                value={formatDate(
                  "hh:MM dd/mm/yyyy",
                  new Date(data.reviewResponse?.createdAt)
                )}
              />
            </Grid>
            <Grid item xs={6.5} />
            <Grid item xs={1.5} className="font-medium pb-2">
              Loại vi phạm:{" "}
            </Grid>
            <Grid item xs={10}>
              <TextField value={data.reviewResponse?.reason} />
            </Grid>
            <Grid item xs={2.5} className="font-medium pb-2">
              Miêu tả thêm và đề xuất:{" "}
            </Grid>
            <Grid item xs={9}>
              <TextField
                textarea
                value={data.reviewResponse?.additionalInfo}
                minHeight="min-h-28"
              />
            </Grid>
          </Grid>
        </>
      )}
      {isPending && (
        <>
          <div className="absolute inset-0 bg-slate-200/25"></div>
          <FlowbiteSpinner size={"xl"} className="absolute top-1/2 left-1/2" />
        </>
      )}
    </div>
  );
});

export default ReviewProductDetail;
