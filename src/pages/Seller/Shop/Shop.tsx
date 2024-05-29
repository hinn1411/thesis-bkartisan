import {
  GiftOutlined,
  MessageOutlined,
  SearchOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Button from "@components/common/button/Button";
import Pagination from "@components/common/pagination/Pagination";
import ProductList from "@components/common/product/ProductList";
import { useUserProfile } from "@hooks/useUserProfile";
import { Rating } from "@mui/material";
import { FC, memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductPagination } from "src/pages/Buyer/home/hooks/useProductPagination";
import useFetchShopInformation from "./hooks/useFetchShopInformation";
import GiftList from "./components/GiftList";
import ShippingCostTable from "./components/ShippingCostTable";

const Shop: FC = memo(() => {
  const { owner } = useParams();
  const { shop, isLoading } = useFetchShopInformation(owner as string);


  const navigate = useNavigate();
  const { user } = useUserProfile();
  console.log(user);

  const { data: products, page, setPage, isFetching } = useProductPagination();
  const [currentTab, setCurrentTab] = useState(0);
  const itemTypes = [
    "Sản phẩm",
    "Hộp quà",
    "Thiệp lời chúc",
    "Chính sách vận chuyển",
  ];
  const handleChatWithSeller = () => {
    navigate("/message", {
      state: {
        username: shop?.info[0].username,
        name: shop?.info[0].name,
        avatar: shop?.info[0].avatar,
      },
    });
  };
  return (
    <div className="min-h-screen mx-4 md:mx-32 my-6 space-y-6">
      {/* Seller information */}
      <section className=" flex space-x-6">
        {/* Image */}
        <img
          alt=""
          src={shop?.info[0].avatar}
          className="object-cover h-[100px] w-[100px] rounded-[7.5px]"
        />
        {/* Details */}
        <div className="flex flex-col justify-between">
          {/* Shop name */}
          <p className="font-sans text-xl font-semibold">
            {shop?.info[0].name}
          </p>
          {/* Rating container */}
          <div className="flex items-center space-x-1">
            <Rating readOnly value={5} size="small" color="black" />
            <span className="text-xs font-medium">({4.5})</span>
          </div>
          {/* Buttons container */}
          <div className="flex items-center space-x-3">
            {user?.username == shop?.info[0].username ? (
              <Button
                onClick={() => navigate('/seller')}
                className="flex items-center space-x-1 shadow-lg py-[9px] px-[32px] bg-white border-2 border-black rounded-full"
              >
                <ShopOutlined
                  size={24}
                  className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer"
                  onClick={() => {}}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <span className="font-sans font-medium text-sm">
                  Quản lý cửa hàng
                </span>
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleChatWithSeller}
                  className="flex items-center space-x-1 shadow-lg py-[9px] px-[32px] bg-white border-2 border-black rounded-full"
                >
                  <MessageOutlined
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                  <span className="font-sans font-medium text-sm">
                    Nhắn tin
                  </span>
                </Button>
                <Button
                  onClick={() => navigate(`/gift/${shop?.info[0].username}`)}
                  className="flex items-center space-x-1 shadow-lg bg-orange-600 text-white border-2 border-orange-600  rounded-full py-[9px] px-[32px]"
                >
                  <GiftOutlined
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                  <span className="font-sans font-semibold text-sm">
                    Lựa quà
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Product container */}
      <section className="space-y-6">
        {/* Filter container */}
        <div className="flex items-center space-x-12">
          <ul className="flex flex-wrap text-start">
            {itemTypes.map((item, index) => (
              <li
                onClick={() => setCurrentTab(index)}
                key={index}
                className="me-2"
              >
                <p
                  className={
                    currentTab == index
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
        {currentTab === 0 && (
          <ProductList data={shop?.products} isLoading={isLoading} />
        )}
        {currentTab === 1 && (
          <GiftList
            data={shop?.gifts.filter((item) => item.type === "box")}
            isLoading={isLoading}
          />
        )}
        {currentTab === 2 && (
          <GiftList
            data={shop?.gifts.filter((item) => item.type === "card")}
            isLoading={isLoading}
          />
        )}
        {currentTab === 3 && <ShippingCostTable items={shop?.transports} />}
        {/* Pagination */}
        {currentTab !== 3 && (
          <Pagination currentPage={page} goToPage={setPage} />
        )}
      </section>
    </div>
  );
});

export default Shop;
