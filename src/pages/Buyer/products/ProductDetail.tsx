import { FC, memo } from "react";
import { Breadcrumb, Textarea } from "flowbite-react";
import { Rating } from "@mui/material";
import Pagination from "@components/common/pagination/Pagination";
import {
  HeartOutlined,
  HeartFilled,
  DownOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useProductDetail } from "./hooks/useProductDetail";
import { BsExclamationCircle } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImageList from "./components/ImageList";
import TextSkeleton from "@components/common/skeleton/Text";
import Spinner from "@components/common/ui/Spinner";
import ImageSlider from "./components/ImageSlider";
import { formatCurrency } from "../../../utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";
import Button from "@components/common/button/Button";
import { useModifyFavorite } from "@hooks/useModifyFavorite";
import { HiHome } from "react-icons/hi";
import { CategoryText, CategoryTextProps } from "@components/common/category";
import { Link } from "react-router-dom";
import { useCart } from "@hooks/useCart";
import ReportProductModal from "./components/ReportProductModal";
import CommentList from "./components/CommentList";
import { useComment } from "./hooks/useComment";
import { urlMatch } from "@utils/urlMatch";
import ReturnIcon from "@components/admin/ReturnIcon";
import ResponseModal from "@components/admin/modal/ResponseModal";
import { useUserProfile } from "@hooks/useUserProfile";

const ProductDetail: FC = memo(() => {
  const [openResponseModal, setOpenResponseModal] = useState(false);

  const { productId } = useParams();
  if (!productId) {
    window.location.href = "/";
  }

  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = urlMatch("products", location.pathname);

  const { user, isPending: isLoadingUser, isAuthenticated } = useUserProfile(); 
  const { data, isFetching } = useProductDetail(productId as string);
  const { addToCart } = useCart();
  const { mutate } = useModifyFavorite();
  const { addComment } = useComment();
  console.log(data);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpenedReportProduct, setIsOpenedReportProduct] = useState(false);
  const [currentStar, setCurrentStar] = useState(5);
  const [currentComment, setCurrentComment] = useState<string>("");
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
  const addToFavoriteList = () => {
    if (!productId) {
      return;
    }
    mutate(+productId);
  };
  const handleAddItem = () => {
    if (!productId) {
      return;
    }
    addToCart({
      quantity: 1,
      productId: +productId,
    });
  };
  const handleAddComment = () => {
    if (!productId) {
      return;
    }
    addComment({
      productId: +productId,
      numberOfStars: currentStar,
      content: currentComment,
      parentId: null,
    });
    setCurrentComment("");
  };
  return (
    <div className="mx-4 md:mx-20">
      {isAdminPage && (
        <ResponseModal
          type="delete-product"
          id={productId}
          setOpenModal={setOpenResponseModal}
          openModal={openResponseModal}
        />
      )}
      <ReportProductModal
        isOpen={isOpenedReportProduct}
        setIsOpen={setIsOpenedReportProduct}
        user={user}
        product={data}
      />
      {/* Links navigation */}
      {isAdminPage ? (
        <div className="flex flex-row-reverse">
          <ReturnIcon />
        </div>
      ) : (
        <Breadcrumb className="flex items-center space-x-2 md:space-x-5 text-xs p-4 ">
          <div className="flex items-center text-sm font-medium space-x-1 hover:text-gray-700">
            <HiHome />
            <Link to="/">Trang chủ</Link>
          </div>

          {data &&
            data.categories.map((category: CategoryTextProps) => (
              <div key={category.id} className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <CategoryText
                  className=" text-sm font-medium text-black hover:text-gray-700"
                  {...category}
                />
              </div>
            ))}
        </Breadcrumb>
      )}

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
            <p className="text-green-600 mb-2">
              Chương trình khuyến mãi được áp dụng đến 27/11/2023
            </p>
            <p>{data?.introduction}</p>
            <div className="flex items-center text-sm space-x-2 my-1">
              <a className="underline" href="#">
                {data?.seller}
              </a>

              <Rating name="read-only" value={5} readOnly />
            </div>
            {!isAdminPage && (
              <div className="max-w-full flex flex-col my-5 space-y-3">
                <button
                  onClick={handleAddItem}
                  className="flex items-center justify-center space-x-3 bg-black w-full md:w-3/4 mx-auto text-white py-3 rounded-full cursor-pointer"
                >
                  <ShoppingCartOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  <p>Thêm vào giỏ hàng</p>
                </button>
                <Button 
                onClick={() => navigate(`/gift/${data?.seller}`)}
                className="bg-[#E5E5E5] flex items-center justify-center space-x-3 w-full  md:w-3/4 mx-auto py-3 rounded-full cursor-pointer">
                  <GiftOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  <p>Tặng quà</p>
                </Button>
                <Button
                  onClick={addToFavoriteList}
                  className="bg-white flex items-center justify-center space-x-3 w-full  md:w-3/4 mx-auto py-3 rounded-full cursor-pointer border"
                >
                  <HeartFilled style={{ color: "#DC2626" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  <p>Yêu thích</p>
                </Button>
              </div>
            )}

            <div className="my-3">
              <button
                type="button"
                className="flex items-center justify-between w-full"
                onClick={() => handleButtonClick(0)}
              >
                <p className="font-medium">Chi tiết sản phẩm</p>
                <DownOutlined
                    className={`transform ${expandedStates[0] ? "rotate-180" : ""}`} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                ></DownOutlined>
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
                    className={`transform ${expandedStates[1] ? "rotate-180" : ""}`} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                ></DownOutlined>
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
                    className={`transform ${expandedStates[2] ? "rotate-180" : ""}`} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                ></DownOutlined>
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
                    className={`transform ${expandedStates[3] ? "rotate-180" : ""}`} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                ></DownOutlined>
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
                      <Link className="underline" to={`/shop/${data?.seller}`}>
                        {data?.seller}
                      </Link>
                    </p>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-xs "
                    >
                      <HeartOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></HeartOutlined>
                      <p>Theo dõi shop</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setIsOpenedReportProduct(true)}
              className="flex items-center text-sm underline space-x-1 cursor-pointer"
            >
              <div className="bg-red-200 p-1 rounded-full">
                <BsExclamationCircle className="text-red-600" />
              </div>
              <p>Báo cáo bài đăng</p>
            </div>
          </section>
        )}

        <div className="space-y-4 my-4">
          <div className="flex items-center">
            <p>Đánh giá sản phẩm | </p>
            <Rating
              name="simple-controlled"
              value={currentStar}
              onChange={(_, newValue) => {
                setCurrentStar(newValue as number);
              }}
            />
            <p className="text-xs font-medium">(1)</p>
          </div>

          {/* Comment box */}
          <div className="max-w flex flex-col">
            <Textarea
              className="resize-none"
              id="comment"
              placeholder="Nhập bình luận"
              rows={4}
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              type="button"
              className="bg-green-500 mt-3 w-1/6 p-1 rounded-md text-white self-end"
            >
              Gửi
            </button>
          </div>
          {/* List comment */}
          <CommentList isLoading={isFetching} data={data} />
          <Pagination currentPage={1} goToPage={() => {}} />
          {/* <div id="ListComment" className=" flex flex-col items-center mb-10"> */}
          {/* <Comment
              star={5}
              content="Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium."
              userName="sweetcake12"
              userImage="https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg"
              date="25 Tháng 10, 2023"
            ></Comment> */}
          {/* <Comment
              star={5}
              content="Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium."
              userName="sweetcake12"
              userImage="https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg"
              date="25 Tháng 10, 2023"
            ></Comment>
            <Comment
              star={5}
              content="Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium."
              userName="sweetcake12"
              userImage="https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg"
              date="25 Tháng 10, 2023"
            ></Comment> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;
