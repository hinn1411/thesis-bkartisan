import { memo, FC, useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";
import { AiOutlineLineChart } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { HiUser } from "react-icons/hi2";
import { BsCart3, BsClipboard2Check } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";

import { urlMatch } from "../../utils/urlMatch";
import { pusherClient } from "@utils/pusher";
import { useQuery } from "@tanstack/react-query";
import apiChat from "@apis/apiChat";

interface SidebarProp {
  isSidebarOpen: boolean;
  role: string;
  username: string;
}

const AdminSidebar: FC<SidebarProp> = memo(
  ({ isSidebarOpen, role, username }) => {
    const location = useLocation();

    const [count, setCount] = useState(0);

    const { data } = useQuery({
      queryKey: ["check-new-messages"],
      queryFn: async () => {
        return await apiChat.checkNewMessage();
      },
      refetchOnWindowFocus: false,
    });

    useEffect(() => {
      pusherClient.subscribe(username);

      const handleMessage = (message) => {
        const pathname = window.location.href;
        const regexPath = new RegExp("message");
        if (!regexPath.test(pathname)) {
          setCount((prev) => prev + 1);
        }
      };

      pusherClient.bind("incoming-message", handleMessage);

      return () => {
        pusherClient.unsubscribe(username);
      };
    }, []);

    useEffect(() => {
      const pathname = window.location.href;
      const regexPath = new RegExp("message");
      if (!regexPath.test(pathname) && data) {
        setCount((prev) => prev + data.count);
      }
    }, [data]);

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
              {role === "admin" && (
                <li className="Thong ke website">
                  <Link
                    to="dashboard"
                    className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                      urlMatch("dashboard", location.pathname)
                        ? `bg-orange-500 text-white`
                        : `hover:bg-orange-100 hover:text-gray-900`
                    } group`}
                  >
                    <AiOutlineLineChart
                      className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                        urlMatch("dashboard", location.pathname)
                          ? ` text-white`
                          : `group-hover:text-gray-900 `
                      } `}
                    ></AiOutlineLineChart>

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Thống kê website
                    </span>
                  </Link>
                </li>
              )}
              <li className="Nguoi dung">
                <Link
                  to="users"
                  className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                    urlMatch("users", location.pathname)
                      ? `bg-orange-500 text-white`
                      : `hover:bg-orange-100 hover:text-gray-900`
                  } group`}
                >
                  <HiUser
                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                      urlMatch("users", location.pathname)
                        ? ` text-white`
                        : `group-hover:text-gray-900 `
                    } `}
                  ></HiUser>
                  <span className="ms-2">Người dùng</span>
                </Link>
              </li>
              {role === "admin" && (
                <li className="CTV">
                  <Link
                    to="collabs"
                    className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                      urlMatch("collabs", location.pathname)
                        ? `bg-orange-500 text-white`
                        : `hover:bg-orange-100 hover:text-gray-900`
                    } group`}
                  >
                    <ImUserTie
                      className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                        urlMatch("collabs", location.pathname)
                          ? ` text-white`
                          : `group-hover:text-gray-900 `
                      } `}
                    ></ImUserTie>

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Cộng tác viên
                    </span>
                  </Link>
                </li>
              )}
              <li className="Report">
                <Link
                  to="reports"
                  className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                    urlMatch("reports", location.pathname)
                      ? `bg-orange-500 text-white`
                      : `hover:bg-orange-100 hover:text-gray-900`
                  } group`}
                >
                  <RiErrorWarningLine
                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                      urlMatch("reports", location.pathname)
                        ? ` text-white`
                        : `group-hover:text-gray-900 `
                    } `}
                  ></RiErrorWarningLine>

                  <span className="flex-1 ms-3 whitespace-nowrap">Report</span>
                </Link>
              </li>
              <li className="San pham">
                <Link
                  to="products"
                  className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                    urlMatch("products", location.pathname)
                      ? `bg-orange-500 text-white`
                      : `hover:bg-orange-100 hover:text-gray-900`
                  } group`}
                >
                  <MdOutlineShoppingBag
                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                      urlMatch("products", location.pathname)
                        ? ` text-white`
                        : `group-hover:text-gray-900 `
                    } `}
                  ></MdOutlineShoppingBag>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sản phẩm
                  </span>
                </Link>
              </li>
              <li className="Duyet san pham">
                <Link
                  to="reviewproducts"
                  className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                    urlMatch("reviewproducts", location.pathname)
                      ? `bg-orange-500 text-white`
                      : `hover:bg-orange-100 hover:text-gray-900`
                  } group`}
                >
                  <BsClipboard2Check
                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                      urlMatch("reviewproducts", location.pathname)
                        ? ` text-white`
                        : `group-hover:text-gray-900 `
                    } `}
                  ></BsClipboard2Check>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Duyệt sản phẩm
                  </span>
                </Link>
              </li>
              <li className="Don hang">
                <Link
                  to="orders"
                  className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                    urlMatch("orders", location.pathname)
                      ? `bg-orange-500 text-white`
                      : `hover:bg-orange-100 hover:text-gray-900`
                  } group`}
                >
                  <BsCart3
                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                      urlMatch("orders", location.pathname)
                        ? ` text-white`
                        : `group-hover:text-gray-900 `
                    } `}
                  ></BsCart3>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Đơn hàng
                  </span>
                </Link>
              </li>
              <li className="Tin nhan">
                <Link
                  to="message"
                  className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                    urlMatch("message", location.pathname)
                      ? `bg-orange-500 text-white`
                      : `hover:bg-orange-100 hover:text-gray-900`
                  } group`}
                  onClick={() => setCount(0)}
                >
                  <BiMessageDots
                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                      urlMatch("message", location.pathname)
                        ? ` text-white`
                        : `group-hover:text-gray-900 `
                    } `}
                  />

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Tin nhắn
                  </span>
                  {count > 0 && <span className="ml-auto">New</span>}
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }
);

export default AdminSidebar;
