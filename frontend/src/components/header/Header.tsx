import { memo, FC } from 'react';
import {
  HeartOutlined,
  ShoppingOutlined,
  GiftOutlined,
  SearchOutlined,
  MenuOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import vnFlag from '../../assets/images/header/vn-flag.png';
import enFlag from '../../assets/images/header/enFlag.webp';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Header.module.css';
const Header: FC = memo(() => {
  // Category dropdown states
  const [isCategoryDropdownOpened, setIsCategoryDropdownOpened] =
    useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let categorySelectionHandler = (e: any) => {
      if (!categoryRef.current?.contains(e.target)) {
        setIsCategoryDropdownOpened(false);
        console.log(categoryRef.current);
      }
    };
    document.addEventListener('mousedown', categorySelectionHandler);
    return () =>
      document.removeEventListener('mousedown', categorySelectionHandler);
  });

  // Language dropdown state
  const [isLanguageDropdownOpened, setIsLanguageDropdownOpened] =
    useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const languageSelectionHandler = (e: any) => {
      if (!languageRef.current?.contains(e.target)) {
        setIsLanguageDropdownOpened(false);
        console.log(languageRef.current);
      }
    };
    document.addEventListener('mousedown', languageSelectionHandler);
    return () =>
      document.removeEventListener('mousedown', languageSelectionHandler);
  });
  return (
    <nav className="container mx-auto px-20 py-4 border-b-2 border-b-gray-300">
      <div className="flex flex-col justify-between items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-auto">
        <span className="text-4xl text-orange-600 font-semibold">
          <Link to='/'>BKArtisan</Link>
        </span>
        <div className="category-container relative" ref={categoryRef}>
          <div
            className="flex justify-center items-center space-x-2 category-trigger"
            onClick={() => setIsCategoryDropdownOpened((prev) => !prev)}
          >
            <div className="flex justify-center items-center">
              <MenuOutlined
                size={24}
                className="hover:scale-110 duration-300 hover:cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-center hover:cursor-pointer">
              {/* <LoginOutlined /> */}
              <span className="font-medium">Danh mục</span>
            </div>
          </div>
          <div
            className={`${
              isCategoryDropdownOpened ? 'block' : 'hidden'
            }  z-10 absolute border mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Phụ kiện
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Nghệ thuật &amp; Sưu tập
                </a>
              </li>
            </ul>
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
            <Link to="/favourite/:userId">
              <HeartOutlined
              size={24}
              className="hover:scale-110 duration-300 hover:cursor-pointer"/>
            </Link>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="flex items-center justify-center absolute top-[-75%] right-[-60%] w-4 h-4 bg-orange-600 text-[10px] text-white text-center rounded-full">
              2
            </div>
            <ShoppingOutlined className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer" />
          </div>
          <div className="flex items-center justify-center">
            <GiftOutlined
              size={24}
              className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer"
            />
          </div>
          <div className="language-container relative" ref={languageRef}>
            <div
              onClick={() => setIsLanguageDropdownOpened((prev) => !prev)}
              className="language-trigger flex items-center justify-center space-x-1 hover:cursor-pointer"
            >
              <img src={vnFlag} className="w-6 h-4" />
              <CaretDownOutlined />
            </div>
            <div
              className={`${
                isLanguageDropdownOpened ? 'block' : 'hidden'
              }  z-10 absolute left-[-100%] border mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-36 mx-auto `}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <img src={vnFlag} className="w-6 h-4" />
                  <p>Tiếng Việt</p>
                </li>
                <li className="flex justify-start items-center space-x-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <img src={enFlag} className="w-6 h-4" />
                  <p>English</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Categories List */}
      <div className="hidden md:flex justify-between items-center mt-4 text-[13px]  md:space-x-4 mx-auto">
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
