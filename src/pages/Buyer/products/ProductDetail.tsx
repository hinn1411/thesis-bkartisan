import { FC, memo } from 'react';
import { Rating, Breadcrumb, Textarea } from 'flowbite-react';

import Pagination from '@components/common/pagination/Pagination';
import Comment from '@components/common/comment/Comment';
import {
  HeartOutlined,
  HeartFilled,
  DownOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useProductDetail } from './hooks/useProductDetail';
import { useParams } from 'react-router-dom';
import ImageList from './components/ImageList';
import TextSkeleton from '@components/common/skeleton/Text';
import Spinner from '@components/common/ui/Spinner';
import ImageSlider from './components/ImageSlider';
import { formatCurrency } from '../../../utils/formatCurrency';
import { CURRENCIES } from '@contants/currencies';
import Button from '@components/common/button/Button';
import { useModifyFavorite } from '@hooks/useModifyFavorite';
import { HiHome } from 'react-icons/hi';
import { CategoryText, CategoryTextProps } from '@components/common/category';
import { Link } from 'react-router-dom';
// const slides = [
//   'https://res.cloudinary.com/dpurshaxm/image/upload/v1710783900/bk_artisan/tmp-2-1710783898283_lstfe7.jpg',
//   'https://res.cloudinary.com/dpurshaxm/image/upload/v1710783900/bk_artisan/tmp-2-1710783898283_lstfe7.jpg',
//   'https://i.etsystatic.com/site-assets/gift-category-pages/L0/gifts-for-christmas-L1.jpg?v=1696278259',
//   'https://i.etsystatic.com/site-assets/gift-category-pages/L0/gifts-for-him-L1.jpg?v=1696278259  ',
// ];

const ProductDetail: FC = memo(() => {
  const { productId } = useParams();
  const { data, isFetching } = useProductDetail(productId as string);
  const { mutate } = useModifyFavorite();
  console.log(data);
  const [currentSlide, setCurrentSlide] = useState(0);

  const starShop: number = 2;
  const starProduct: number = 2;
  const starsProduct = Array.from({ length: 5 }, (_, index) => (
    <Rating.Star key={index} filled={index < starProduct} />
  ));
  const starsShop = Array.from({ length: 5 }, (_, index) => (
    <Rating.Star key={index} filled={index < starShop} />
  ));

  const [expandedStates, setExpandedStates] = useState([
    false,
    false,
    false,
    false,
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
  return (
    <div className="mx-4 md:mx-20">
      {/* Links navigation */}
      <Breadcrumb className='className="flex items-center space-x-2 md:space-x-5 text-xs p-4 "'>
        <div className="flex items-center text-sm font-medium space-x-1 hover:text-gray-700">
          <HiHome />
          <Link to="/">Trang chủ</Link>
        </div>

        {data &&
          data.categories.map((category: CategoryTextProps) => (
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
      {/* <div>
        <CategoryLink linkTo="/" categoryName="Trang chủ"></CategoryLink>
        <CategoryLink
          linkTo=""
          categoryName="Đồ chơi & Giải trí"
        ></CategoryLink>
        <CategoryLink linkTo="" categoryName="Trò chơi & Câu đố"></CategoryLink>
        <CategoryLink linkTo="" categoryName="Board game"></CategoryLink>
        <CategoryLink linkTo="" categoryName="Cờ"></CategoryLink>
        <p>Cờ gỗ của nga</p>
      </div> */}
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
              <h1 className="text-2xl font-semibold">{data.name}</h1>
            )}

            <div className="flex items-center mb-3">
              {isFetching ? (
                <TextSkeleton />
              ) : (
                <p className="text-green-600 mr-1 text-xl">
                  {formatCurrency(data?.currentCost, CURRENCIES.VIETNAMDONG)}
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

              <Rating className="mt-2 mb-1">{starsShop}</Rating>
            </div>
            <div className="max-w-full flex flex-col my-5 space-y-3">
              <button className="flex items-center justify-center space-x-3 bg-black w-full md:w-3/4 mx-auto text-white py-3 rounded-full cursor-pointer">
                <ShoppingCartOutlined />
                <p>Thêm vào giỏ hàng</p>
              </button>
              <Button className="bg-[#E5E5E5] flex items-center justify-center space-x-3 w-full  md:w-3/4 mx-auto py-3 rounded-full cursor-pointer">
                <GiftOutlined />
                <p>Tặng quà</p>
              </Button>
              <Button
                onClick={addToFavoriteList}
                className="bg-white flex items-center justify-center space-x-3 w-full  md:w-3/4 mx-auto py-3 rounded-full cursor-pointer border"
              >
                <HeartFilled style={{ color: '#DC2626' }} />
                <p>Yêu thích</p>
              </Button>
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
                    expandedStates[0] ? 'rotate-180' : ''
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[0] ? 'max-h-96' : 'max-h-0'
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
                    expandedStates[1] ? 'rotate-180' : ''
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[1] ? 'max-h-96' : 'max-h-0'
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
                    expandedStates[2] ? 'rotate-180' : ''
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[2] ? 'max-h-96' : 'max-h-0'
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
                    expandedStates[3] ? 'rotate-180' : ''
                  }`}
                ></DownOutlined>
              </button>
              <div
                className={`overflow-hidden transition-max-h duration-300 ${
                  expandedStates[3] ? 'max-h-96' : 'max-h-0'
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
                      Chủ sở hữu của{' '}
                      <a className="underline text-sm" href="#">
                        {data.seller}
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
          </section>
        )}

        {/* Comment and rating */}
        <div>
          {/* Rating */}
          <Rating className="mt-2 mb-1">
            <p className="border-r-2 pr-1 border-black">Đánh giá sản phẩm</p>
            {starsProduct}
            <p className="ml-1 mb-4 text-sm">(302)</p>
          </Rating>
          {/* Comment box */}
          <form className="max-w flex flex-col">
            <Textarea
              className="resize-none"
              id="comment"
              placeholder="Nhập bình luận"
              rows={4}
            />
            <button
              type="submit"
              className="bg-green-500 mt-3 w-1/6 p-1 rounded-md text-white self-end"
            >
              Gửi
            </button>
          </form>
          {/* List comment */}
          <div id="ListComment" className=" flex flex-col items-center mb-10">
            <Comment
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
            ></Comment>
            <Comment
              star={5}
              content="Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium."
              userName="sweetcake12"
              userImage="https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg"
              date="25 Tháng 10, 2023"
            ></Comment>

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;
