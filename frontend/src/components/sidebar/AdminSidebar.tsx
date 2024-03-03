import { memo, FC } from "react";
import { MdOutlineDiscount, MdOutlineShoppingBag } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";
import { AiOutlineLineChart } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { HiUser } from "react-icons/hi2"
import { BsCart3 } from "react-icons/bs";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


interface SidebarProp {
  isSidebarOpen: boolean;
}

const AdminSidebar: FC<SidebarProp> = memo(({isSidebarOpen}) => {
  const location = useLocation();

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="">
              <Link
                to=""
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  location.pathname == "/admin"
                    ? `bg-orange-500 text-white`
                    : `hover:bg-orange-100 hover:text-gray-900`
                } group`}
              >
                {/* <svg
                  className={`text-gray-500 transition duration-75 dark:text-gray-400 ${
                    name == "user"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                  fill="currentColor"
                  width="25" height="24" viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.5 13.3337C19.5376 13.3337 22 10.9458 22 8.00033C22 5.05481 19.5376 2.66699 16.5 2.66699C13.4624 2.66699 11 5.05481 11 8.00033C11 10.9458 13.4624 13.3337 16.5 13.3337Z"/>
                  <path d="M27.5 23.334C27.5 26.6473 27.5 29.334 16.5 29.334C5.5 29.334 5.5 26.6473 5.5 23.334C5.5 20.0207 10.4252 17.334 16.5 17.334C22.5748 17.334 27.5 20.0207 27.5 23.334Z"/>
                </svg> */}
                <HiUser
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    location.pathname == "/admin"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                ></HiUser>
                <span className="ms-2">Người dùng</span>
              </Link>
            </li>
            <li>
              <Link
                to="managecollab"
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  location.pathname == "/admin/managecollab"
                    ? `bg-orange-500 text-white`
                    : `hover:bg-orange-100 hover:text-gray-900`
                } group`}
              >
                <ImUserTie
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    location.pathname == "/admin/managecollab"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                ></ImUserTie>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Quản trị viên
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  location.pathname == "ManageOrders"
                    ? `bg-orange-500 text-white`
                    : `hover:bg-orange-100 hover:text-gray-900`
                } group`}
              >
                <BsCart3
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    location.pathname == "ManageOrders"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                ></BsCart3>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Quản lý đơn hàng
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  location.pathname == "ManageProducts"
                    ? `bg-orange-500 text-white`
                    : `hover:bg-orange-100 hover:text-gray-900`
                } group`}
              >
                <MdOutlineShoppingBag
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    location.pathname == "ManageProducts"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                ></MdOutlineShoppingBag>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Quản lý sản phẩm
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  location.pathname == "Report"
                    ? `bg-orange-500 text-white`
                    : `hover:bg-orange-100 hover:text-gray-900`
                } group`}
              >
                <AiOutlineLineChart
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    location.pathname == "Report"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                ></AiOutlineLineChart>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Báo cáo doanh thu
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  location.pathname == "Message"
                    ? `bg-orange-500 text-white`
                    : `hover:bg-orange-100 hover:text-gray-900`
                } group`}
              >
                <BiMessageDots
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    location.pathname == "Message"
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Tin nhắn</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
});

export default AdminSidebar;
