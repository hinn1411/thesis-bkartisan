import {
  GiftOutlined,
  MessageOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Button from '@components/common/button/Button';
import Pagination from '@components/common/pagination/Pagination';
import ProductList from '@components/common/product/ProductList';
import { Rating } from '@mui/material';
import { FC, memo, useState } from 'react';
import { useProductPagination } from 'src/pages/Buyer/home/hooks/useProductPagination';

const Shop: FC = memo(() => {
  const { data: products, page, setPage, isFetching } = useProductPagination();
  const [currentItemType, setCurrentItemType] = useState(0);
  const itemTypes = ['Sản phẩm', 'Hộp quà', 'Thiệp lời chúc'];
  return (
    <div className="min-h-screen mx-4 md:mx-32 my-6 space-y-6">
      {/* Seller information */}
      <section className=" flex space-x-6">
        {/* Image */}
        <img
          alt=""
          src="https://i1.sndcdn.com/artworks-yzNuGkvkb8zQNVyU-BFXBgA-t500x500.jpg"
          className="object-cover h-[100px] w-[100px] rounded-[7.5px]"
        />
        {/* Details */}
        <div className="flex flex-col justify-between">
          {/* Shop name */}
          <p className="font-sans text-xl font-semibold">nguyen van a</p>
          {/* Rating container */}
          <div className="flex items-center space-x-1">
            <Rating value={5} size="small" color="black" />
            <span className="text-xs font-medium">({4.5})</span>
          </div>
          {/* Buttons container */}
          <div className="flex items-center space-x-3">
            <Button className="flex items-center space-x-1 shadow-lg py-[9px] px-[32px] bg-white border-2 border-black rounded-full">
              <MessageOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <span className="font-sans font-medium text-sm">Nhắn tin</span>
            </Button>
            <Button className="flex items-center space-x-1 shadow-lg bg-orange-600 text-white border-2 border-orange-600  rounded-full py-[9px] px-[32px]">
              <GiftOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <span className="font-sans font-semibold text-sm">Lựa quà</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Product container */}
      <section className='space-y-6'>
        {/* Filter container */}
        <div className="flex items-center space-x-12">
          <ul className="flex flex-wrap text-start">
            {itemTypes.map((item, index) => (
              <li
                onClick={() => setCurrentItemType(index)}
                key={index}
                className="me-2"
              >
                <p
                  className={
                    currentItemType == index
                      ? `inline-block p-4 text-orange-600 font-semibold border-b-2 border-orange-600 rounded-t-lg active`
                      : `inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300`
                  }
                >
                  {item}
                </p>
              </li>
            ))}
          </ul>
          <form className="flex justify-center items-center border-2 border-black max-w-1/3 px-8 py-1 rounded-full">
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              className="w-full focus:outline-none border-none placeholder:font-thin border-transparent focus:border-transparent focus:ring-0 "
            />
            <button className="flex justify-center items-center">
              <SearchOutlined
                className="hover:scale-110 duration-300"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </button>
          </form>
        </div>
        {/* Product list */}
        <ProductList data={products} isLoading={isFetching} />

        {/* Pagination */}
        <Pagination currentPage={page} goToPage={setPage} />
      </section>
    </div>
  );
});

export default Shop;
