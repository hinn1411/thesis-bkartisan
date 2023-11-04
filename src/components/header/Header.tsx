import { memo, FC } from 'react';
import {
  HeartOutlined,
  ShoppingOutlined,
  GiftOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Header: FC = memo(() => {
  return (
    <nav className="container relative mx-auto px-10 py-4">
      <div className="flex flex-col justify-between items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-auto px-6 ">
        <span className="text-4xl text-orange-600 font-semibold">
          BKArtisan
        </span>
        <div className="flex justify-center items-center space-x-2">
          <div className="flex justify-center items-center">
            <MenuOutlined
              size={24}
              className="hover:scale-110 duration-300 hover:cursor-pointer"
            />
          </div>
          <div className=" flex items-center justify-center hover:cursor-pointer">
            {/* <LoginOutlined /> */}
            <span className="font-medium">Danh mục</span>
          </div>
        </div>
        {/* Search container */}
        <div className="flex justify-center items-center border-2 border-black md:w-1/3 px-8 py-3 rounded-full">
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
            className="w-full border-none placeholder:font-thin focus:outline-none"
          />
          <button className="flex justify-center items-center">
            <SearchOutlined className="hover:scale-110 duration-300" />
          </button>
        </div>
        {/* Icon container */}
        <div className="flex justify-center items-center space-x-7">
          <div className=" flex items-center justify-center hover:cursor-pointer">
            {/* <LoginOutlined /> */}
            <span className="font-medium">
              <Link to="/login">Đăng nhập</Link>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <HeartOutlined
              size={24}
              className="hover:scale-110 duration-300 hover:cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center">
            <ShoppingOutlined
              size={24}
              className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center">
            <GiftOutlined
              size={24}
              className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center mt-4   text-[13px]  md:space-x-4 mx-auto px-6 ">
        {/* <div>Quà theo lễ</div> */}
        <div className="group hover:cursor-pointer">
          <span>Quà theo lễ</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>
        <div className="group hover:cursor-pointer">
          <span>Quần áo &amp; Giày dép</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>

        <div className="group hover:cursor-pointer">
          <span>Trang sức &amp; Phụ kiện</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>
        <div className="group hover:cursor-pointer">
          <span>Nhà cửa &amp; Trang trí</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>
        <div className="group hover:cursor-pointer">
          <span>Đồ chơi &amp; Giải trí</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>
        <div className="group hover:cursor-pointer">
          <span>Đồ thủ công</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>
        <div className="group hover:cursor-pointer">
          <span>Đồ cổ</span>
          <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-orange-600 group-hover:opacity-100"></div>
        </div>
      </div>
    </nav>
  );
});

export default Header;
