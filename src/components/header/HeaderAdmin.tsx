import React, { FC, memo, useState } from "react";
import logo from "../../assets/images/logo/dummy logo.png";
import apiAuth from "@apis/apiAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

interface ToggleSidebarProp {
  toggleSidebar: (event: React.MouseEvent) => void;
  name: string;
}

const HeaderAdmin: FC<ToggleSidebarProp> = memo(({toggleSidebar, name}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await apiAuth.logout().then(() => {
        navigate("/login");
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      throw err;
    }
  };


  return (
    <>
      <nav className="fixed top-0 z-50 w-full h-16 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex justify-between">
            <div className="flex justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a className="flex ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="Logo" />
                <span className="text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  BKArtisan
                </span>
              </a>
            </div>
            <div className="space-x-8 flex">
              <div className="text-base font-semibold self-center">{name}</div>
              <Button onClick={handleLogout} color="dark" isProcessing={isLoading} disabled={isLoading}>Thoát</Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

export default HeaderAdmin;
