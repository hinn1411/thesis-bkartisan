import React, { memo, FC, ChangeEvent, useContext } from "react";
// Icons
import {
  HeartOutlined,
  ShoppingOutlined,
  // GiftOutlined,
  SearchOutlined,
  MenuOutlined,
  ShopOutlined,
  FileSearchOutlined,
  CommentOutlined,
  BellOutlined,
  UserOutlined,
  InfoCircleOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
// Languages
import vnFlag from "../../assets/images/header/vn-flag.png";
import enFlag from "../../assets/images/header/enFlag.webp";
import { LANGUAGES } from "../../constants/languages";
import { Link, useNavigate } from "react-router-dom";
// Apis
import apiAuth from "../../apis/apiAuth";
// Styles
import "./Header.module.css";
//  Hooks
import { useUserProfile } from "../../hooks/useUserProfile";
import { useCategory } from "../../hooks/useCategory";
import { useState, useEffect, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
// Skeletons
import AvatarSkeleton from "../common/skeleton/Avatar";
import TextSkeleton, { TextListSkeleton } from "../common/skeleton/Text";
import LogoSkeleton from "../common/skeleton/Logo";
import {
  CategoryCardProps,
  CategoryText,
} from "@components/common/category/index";
import { CartContext, CartContextType } from "src/store/CartContext";
const Header: FC = memo(() => {
  // Navigation
  const navigate = useNavigate();

  // Languages
  const [currentFlag, setCurrentFlag] = useState<string>(vnFlag);
  const { t, i18n } = useTranslation();
  const { resolvedLanguage: currentLanguage, changeLanguage } = i18n;

  // UI
  const [isCategoryDropdownOpened, setIsCategoryDropdownOpened] =
    useState(false);
  const [isLanguageDropdownOpened, setIsLanguageDropdownOpened] =
    useState(false);
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);

  // References
  const categoryRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Data
  const [searchKey, setSearchKey] = useState<string>("");
  const { user, isPending: isLoadingUser, isAuthenticated } = useUserProfile();
  const { categories, isPending: isLoadingCategories } = useCategory();
  const { numberOfItems } = useContext(CartContext) as CartContextType;
  // console.log(`user = `, user);
  useEffect(() => {
    const userSelectionHandler = (e: MouseEvent) => {
      if (!userRef.current?.contains(e.target as Node)) {
        setIsUserDropdownOpened(false);
      }
    };
    document.addEventListener("mousedown", userSelectionHandler);
    return () =>
      document.removeEventListener("mousedown", userSelectionHandler);
  });
  useEffect(() => {
    const categorySelectionHandler = (e: MouseEvent) => {
      if (!categoryRef.current?.contains(e.target as Node)) {
        setIsCategoryDropdownOpened(false);
        // console.log(categoryRef.current);
      }
    };
    document.addEventListener("mousedown", categorySelectionHandler);
    return () =>
      document.removeEventListener("mousedown", categorySelectionHandler);
  });

  useEffect(() => {
    const languageSelectionHandler = (e: MouseEvent) => {
      if (!languageRef.current?.contains(e.target as Node)) {
        setIsLanguageDropdownOpened(false);
        // console.log(languageRef.current);
      }
    };
    document.addEventListener("mousedown", languageSelectionHandler);
    return () =>
      document.removeEventListener("mousedown", languageSelectionHandler);
  });

  const changeCurrentLanguage = (newFlag: string, newLanguage: string) => {
    setCurrentFlag(newFlag);
    changeLanguage(newLanguage);
    setIsLanguageDropdownOpened(false);
  };

  const handleLogout = async () => {
    try {
      console.log(`log out`);
      await apiAuth.logout().then(() => {
        location.reload();
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  // isPending -> render skeleton

  const search = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search?name=${searchKey}`, {
      replace: true,
    });
  };

  return (
    <nav
      className={`container mx-auto px-20 py-4 border-b-2 border-b-gray-300`}
    >
      <div className="flex flex-col justify-between items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 mx-auto">
        <span className="text-4xl text-orange-600 font-semibold">
          {isLoadingUser ? (
            <LogoSkeleton />
          ) : (
            <Link to="/" className="flex justify-center items-center space-x-2">
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="43" height="43" rx="8" fill="#EA580C" />
                <path
                  d="M17.1804 13.5354C16.3111 14.4208 16.3111 15.8535 17.1965 16.7389L19.1283 18.6707C20.9473 20.4897 20.9473 23.4518 19.1283 25.2708L15.5867 21.7293C14.6772 20.8197 14.2184 19.6204 14.2184 18.4292C14.2184 17.2379 14.6772 16.0386 15.5867 15.1291L17.1563 13.5596C17.1643 13.5515 17.1724 13.5435 17.1804 13.5354Z"
                  fill="#EA580C"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M18.726 18.2675L17.1967 16.7382C16.3113 15.8528 16.3033 14.4282 17.1806 13.5347C18.0499 12.6815 19.4343 12.6976 20.2956 13.5589C20.7302 13.9935 20.9475 14.565 20.9475 15.1284C20.9475 15.6918 20.7302 16.2633 20.2956 16.698L19.9334 17.0602"
                  fill="#EA580C"
                />
                <path
                  d="M18.726 18.2675L17.1967 16.7382C16.3113 15.8528 16.3033 14.4282 17.1806 13.5347C18.0499 12.6815 19.4343 12.6976 20.2956 13.5589C20.7302 13.9935 20.9475 14.565 20.9475 15.1284C20.9475 15.6918 20.7302 16.2633 20.2956 16.698L19.9334 17.0602"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M26.3153 29.3514C27.1846 28.466 27.1846 27.0333 26.2992 26.1479L24.3674 24.2162C22.5483 22.3971 22.5483 19.4351 24.3674 17.616L27.909 21.1575C28.8185 22.0671 29.2773 23.2664 29.2773 24.4576C29.2773 25.6489 28.8185 26.8482 27.909 27.7577L26.3394 29.3273C26.3233 29.3434 26.3153 29.3514 26.3153 29.3514Z"
                  fill="#EA580C"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M24.7622 24.6265L26.2915 26.1558C27.1769 27.0412 27.1849 28.4659 26.3076 29.3593C25.4383 30.2125 24.0538 30.1964 23.1926 29.3352C22.758 28.9005 22.5406 28.3291 22.5406 27.7656C22.5406 27.2022 22.758 26.6307 23.1926 26.1961L23.5629 25.8258"
                  fill="#EA580C"
                />
                <path
                  d="M24.7622 24.6265L26.2915 26.1558C27.1769 27.0412 27.1849 28.4659 26.3076 29.3593C25.4383 30.2125 24.0538 30.1964 23.1926 29.3352C22.758 28.9005 22.5406 28.3291 22.5406 27.7656C22.5406 27.2022 22.758 26.6307 23.1926 26.1961L23.5629 25.8258"
                  stroke="white"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
              <span>BKArtisan</span>
            </Link>
          )}
        </span>
        {/* Category droplist */}
        {isLoadingUser ? (
          <TextSkeleton className="w-[150px] h-[40px] rounded-full" />
        ) : (
          <div className="category-container relative" ref={categoryRef}>
            <div
              className="flex justify-center items-center space-x-2 category-trigger"
              onClick={() => setIsCategoryDropdownOpened((prev) => !prev)}
            >
              <div className="flex justify-center items-center">
                <MenuOutlined
                  size={24}
                  className="hover:scale-110 duration-300 hover:cursor-pointer"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              <div className="flex items-center justify-center hover:cursor-pointer">
                {/* <LoginOutlined /> */}
                <span className="font-medium">
                  <Trans i18nKey="header.categories"></Trans>
                </span>
              </div>
            </div>
            {isLoadingCategories ? (
              <>{/* <TextSkeleton /> */}</>
            ) : (
              <div
                className={`${
                  isCategoryDropdownOpened ? "block" : "hidden"
                }  z-10 absolute right-[50%] translate-x-[50%] border mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48`}
              >
                <ul
                  onClick={() => setIsCategoryDropdownOpened(false)}
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                >
                  {categories.map((category: CategoryCardProps) => (
                    <CategoryText key={category.id} {...category} />
                    // <li key={category.id}>
                    //   <a
                    //     href="#"
                    //     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    //   >
                    //     {category.name}
                    //   </a>
                    // </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Search container */}
        {isLoadingUser ? (
          <TextSkeleton className="w-[500px] h-[70px] rounded-full" />
        ) : (
          <form
            onSubmit={search}
            className="flex justify-center items-center border-2 border-black md:w-1/3 px-8 py-3 rounded-full"
          >
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchKey(e.target.value)
              }
              type="text"
              placeholder={t("header.search")}
              className="w-full focus:outline-none border-none placeholder:font-thin border-transparent focus:border-transparent focus:ring-0 "
            />
            <button
              onClick={() =>
                navigate(`/search?name=${searchKey}`, {
                  replace: true,
                })
              }
              className="flex justify-center items-center"
            >
              <SearchOutlined
                className="hover:scale-110 duration-300"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </button>
          </form>
        )}

        {/* Icon container */}
        <div className="flex justify-center items-center space-x-7">
          {/* Login Button */}
          <div className="flex items-center justify-center hover:cursor-pointer">
            {isLoadingUser ? (
              <AvatarSkeleton className="h-[30px] w-[30px]" />
            ) : isAuthenticated ? (
              // User droplist
              <div
                className="options-container relative hover:cursor-pointer"
                ref={userRef}
              >
                <div
                  onClick={() => setIsUserDropdownOpened((cur) => !cur)}
                  className="flex justify-center items-center space-x-1"
                >
                  <img
                    src={user.avatar}
                    className="object-cover h-[30px] w-[30px] rounded-full border-solid border-2 border-orange-600"
                  ></img>
                  <CaretDownOutlined
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <div
                  className={`${
                    isUserDropdownOpened ? "block" : "hidden"
                  } z-10 absolute  right-[50%] translate-x-[50%] border mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 mx-auto`}
                >
                  <ul
                    onClick={() => setIsUserDropdownOpened(false)}
                    className="py-2 text-sm text-gray-700 dark:text-gray-200 mx-auto"
                  >
                    <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <p className="font-semibold">{user.name}</p>
                    </li>
                    <Link to="/order">
                      <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <FileSearchOutlined
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                        <p>Quản lý đơn hàng</p>
                      </li>
                    </Link>
                    <Link to="/message">
                      <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <CommentOutlined
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                        <p>Tin nhắn</p>
                      </li>
                    </Link>

                    <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <BellOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <p>Thông báo</p>
                    </li>
                    <Link to="/favorite">
                      <li className="flex items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <HeartOutlined
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                        <div>Danh sách yêu thích</div>
                      </li>
                    </Link>
                    <Link to='/profile'>
                      <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <UserOutlined
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                        <p>Trang cá nhân</p>
                      </li>
                    </Link>

                    <li className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <InfoCircleOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <p>Hướng dẫn sử dụng</p>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <p className="text-red-600 font-semibold">Đăng xuất</p>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <span className="font-medium">
                <Link to="/login">{t("header.login")}</Link>
              </span>
            )}
          </div>
          {isLoadingUser ? (
            <TextSkeleton className="h-[30px] w-[150px] rounded-full" />
          ) : (
            <>
              <Link to="/favorite">
                <div className="flex items-center justify-center">
                  <HeartOutlined
                    size={24}
                    className="hover:scale-110 duration-300 hover:cursor-pointer"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </Link>

              {/* Cart icon container */}
              <Link to="/cart">
                <div className="relative flex items-center justify-center">
                  <div className="flex items-center justify-center absolute top-[-75%] right-[-60%] w-4 h-4 bg-orange-600 text-[10px] text-white text-center rounded-full">
                    {numberOfItems}
                  </div>

                  <ShoppingOutlined
                    className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </Link>

              <Link to="/seller_registration">
                <div className="flex items-center justify-center">
                  <ShopOutlined
                    size={24}
                    className="hover:scale-110 duration-300 pointer-cursor hover:cursor-pointer"
                    onClick={() => {}}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </Link>

              {/* Language container */}
              <div className="language-container relative" ref={languageRef}>
                <div
                  onClick={() => setIsLanguageDropdownOpened((prev) => !prev)}
                  className="language-trigger flex items-center justify-center space-x-1 hover:cursor-pointer"
                >
                  <img src={currentFlag} className="w-6 h-4" />
                  <CaretDownOutlined
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <div
                  className={`${
                    isLanguageDropdownOpened ? "block" : "hidden"
                  }  z-10 absolute right-[50%] translate-x-[50%]  border mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-36 mx-auto `}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li
                      onClick={() =>
                        changeCurrentLanguage(vnFlag, LANGUAGES.VIETNAMESE)
                      }
                    >
                      <button
                        className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        disabled={currentLanguage == LANGUAGES.VIETNAMESE}
                      >
                        <img src={vnFlag} className="w-6 h-4" />
                        <p>Tiếng Việt</p>
                      </button>
                    </li>
                    <li
                      onClick={() =>
                        changeCurrentLanguage(enFlag, LANGUAGES.ENGLISH)
                      }
                    >
                      <button
                        className="flex justify-start items-center space-x-1 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        disabled={currentLanguage == LANGUAGES.ENGLISH}
                      >
                        <img src={enFlag} className="w-6 h-4" />
                        <p>English</p>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Categories List */}
      {isLoadingCategories ? (
        <TextListSkeleton numberOfElement={7} />
      ) : (
        <ul className="hidden md:flex justify-between items-center mt-4 text-[13px] md:space-x-4 mx-auto">
          {categories.map((category: CategoryCardProps) => {
            if (category.isSelected) {
              return (
                <CategoryText
                  className="duration-300 hover:-translate-y-0.5"
                  key={category.id}
                  {...category}
                />
              );
            }
          })}
        </ul>
      )}
    </nav>
  );
});

export default Header;
