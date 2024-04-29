import { memo, FC} from 'react';
import logo from '../../assets/images/logo/dummy logo.png'
import { MdOutlineDiscount, MdOutlineShoppingBag} from 'react-icons/md';
import { BiMessageDots, BiBox } from "react-icons/bi";
import { AiOutlineLineChart, AiOutlineGift } from "react-icons/ai";
import { BsCart3 } from 'react-icons/bs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface sideBarName {
  name: string;
}

const SellerSideBar: FC<sideBarName> = memo(({name}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const sidebar = document.getElementById('logo-sidebar');
    const dropdownButton = document.getElementById('dropdownButton');

    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }

    if (dropdownButton && !dropdownButton.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    
    <div>
      <nav className="fixed top-0 z-50 w-full h-16 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex justify-between">
          <div className="flex justify-start rtl:justify-end">
            <button  onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Toggle sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <Link to="/seller">
              <a href="#" className="flex ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="Logo" />
                <span className=" text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">BKartisan</span>
              </a>
            </Link>
            
          </div>
          <div className="flex items-center ">
              <div className="flex flex-col items-end">
                <div className='flex flex-row items-center space-x-1'>
                  <button type="button" className={`flex text-sm items-center space-x-3 rounded-full ${isDropdownOpen ? 'focus:bg-gray-300 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600' : ''} `} aria-expanded={isDropdownOpen} data-dropdown-toggle="dropdown-user" id="dropdownButton"
                onClick={handleButtonClick}>
                    
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"></img>
                    <p>Quang</p>
                  </button>
                  
                </div>
                <div className={`z-50 ${isDropdownOpen ? '' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="dropdown-user">
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </nav>

    <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className=''>
                <Link to="/seller">
                  <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "dashboard"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <svg className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "dashboard"? ` text-white` : `group-hover:text-gray-900 `} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span className="ms-3">Dashboard</span>
                  </a>
                </Link>
                
            </li>
            <li>
              <Link to="/seller/manage_discounts">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "ManageDiscounts"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <MdOutlineDiscount className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "ManageDiscounts"? ` text-white` : `group-hover:text-gray-900 `} `}></MdOutlineDiscount>
                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Mã giảm giá</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/seller/manage_orders">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "ManageOrders"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <BsCart3 className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "ManageOrders"? ` text-white` : `group-hover:text-gray-900 `} `}></BsCart3>
                  <span className="flex-1 ms-3 whitespace-nowrap">Quản lý đơn hàng</span>
                </a>
              </Link>
                
            </li>
            <li>
              <Link to="/seller/manage_products">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "ManageProducts"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <MdOutlineShoppingBag className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "ManageProducts"? ` text-white` : `group-hover:text-gray-900 `} `}></MdOutlineShoppingBag>
                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Quản lý sản phẩm</span>
                </a>
              </Link>
                
            </li>
            <li>
              <Link to="/seller/report">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "Report"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <AiOutlineLineChart className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "Report"? ` text-white` : `group-hover:text-gray-900 `} `}></AiOutlineLineChart>
                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Báo cáo doanh thu</span>
                </a>
              </Link>
            
            </li>
            <li>
              <Link to="/seller/message">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "Message"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <BiMessageDots className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "Message"? ` text-white` : `group-hover:text-gray-900 `} `} />
                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Tin nhắn</span>
                </a>
              </Link>
                
            </li>
            <li>
              <Link to="/seller/manage_transport">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "ManageTransport"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <BiBox className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "ManageTransport"? ` text-white` : `group-hover:text-gray-900 `} `} />
                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Quản lý vận chuyển</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/seller/manage_gift">
                <a href="#" className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${name == "ManageGift"? `bg-orange-500 text-white` : `hover:bg-orange-100 hover:text-gray-900`} group`}>
                  <AiOutlineGift className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${name == "ManageGift"? ` text-white` : `group-hover:text-gray-900 `} `} />
                  
                  <span className="flex-1 ms-3 whitespace-nowrap">Quản lý quà tặng</span>
                </a>
              </Link>
                
            </li>
            
          </ul>
      </div>
    </aside>
    </div>

  );
});

export default SellerSideBar;
