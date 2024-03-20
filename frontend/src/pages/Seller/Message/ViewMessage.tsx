import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from 'react-icons/pi';
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";

const ViewMessage: FC = memo(() => {
  return (
    <div>
      <SellerSideBar name = "Message"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='grid grid-cols-2' style={{ gridTemplateColumns: '30% 70%' }}>
          <div className='border-r-2 pr-1'>
              <form className="max-w-lg mx-auto">
                  <div className="flex">
                      <div className="relative w-full m-2">
                          <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-2xl  border border-gray-300 focus:ring-orange-500 focus:border-orange-500 " placeholder="Tìm kiếm..." required />
                          <button type="submit" className=" absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-600 rounded-e-2xl border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300">
                              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                              <span className="sr-only">Search</span>
                          </button>
                      </div>
                  </div>
              </form>
            <div className='overflow-y-auto max-h-[79vh] min-h-[79vh]'>
                  <div className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                      <div className="flex-shrink-0">
                          <img className="w-10 h-10 rounded-full" src="https://duan24h.net/wp-content/uploads/2023/10/pam-2.webp" alt="Neil image"/>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                          <p className=" font-medium text-gray-900 truncate dark:text-white">
                              Pamyeuoi
                          </p>
                          <p className=" text-gray-500 truncate dark:text-gray-400">
                              Bạn: Helloooooo
                          </p>
                      </div>
                      <div className="inline-flex text-base text-gray-900 dark:text-white">
                          13:30
                      </div>
                  </div>

                  <div className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                      <div className="flex-shrink-0">
                          <img className="w-10 h-10 rounded-full" src="https://duan24h.net/wp-content/uploads/2023/10/pam-2.webp" alt="Neil image"/>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                          <p className=" font-medium text-gray-900 truncate dark:text-white">
                              Pamyeuoi
                          </p>
                          <p className=" text-gray-500 truncate dark:text-gray-400">
                              Bạn: Helloooooo
                          </p>
                      </div>
                      <div className="inline-flex text-base text-gray-900 dark:text-white">
                          13:30
                      </div>
                  </div>

                  

                  

            </div>
              
          </div>
          <div className=''>
            <div className='flex my-2 justify-between border-b-1 shadow-sm pb-2'>
              <div className="flex space-x-2 items-center px-2">
                <img className="w-8 h-8 rounded-full" src="https://duan24h.net/wp-content/uploads/2023/10/pam-2.webp" alt="Neil image"/>
                <p className=" font-medium text-gray-900 truncate dark:text-white">
                    Pamyeuoi
                </p>
              </div>
              <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <PiTrashLight className = 'w-5 h-5'/>
                <p className='pr-4'>Xóa</p>
              </div>
            </div>

            <div className='max-h-[79vh] min-h-[79vh] flex flex-col justify-between'>

              <div className='space-y-2 overflow-y-auto'>
                
                {/* Gửi về */}
                <div className="flex items-start mx-2">
                  <div className="flex-shrink-0">
                      <img className="w-10 h-10 rounded-full" src="https://duan24h.net/wp-content/uploads/2023/10/pam-2.webp" alt="Neil image"/>
                  </div>
                  <div className="rounded-md p-1 max-w-sm ms-2 flex flex-col items-end bg-blue-100 whitespace-normal">
                      <p className=" text-gray-900 overflowWrap">
                        Bạn: Hellooaaaaaaaaaaaaaaaaaaaaaaaaaa aaa aaaa aaaaa aaaaa
                      </p>
                      <p>
                        13:30
                      </p>
                  </div>
                </div>

                {/* Gửi đi */}
                <div className="flex items-start mx-2 flex-row-reverse">
                  <div className="flex-shrink-0">
                      <img className="w-10 h-10 rounded-full" src="https://duan24h.net/wp-content/uploads/2023/10/pam-2.webp" alt="Neil image"/>
                  </div>
                  <div className="rounded-md p-1 max-w-sm me-2 flex flex-col items-end bg-green-100 whitespace-normal">
                      <p className=" text-gray-900 overflowWrap">
                        Bạn: Hellooaaaaaaaaaaaaaaaaaaaaaaaaaa aaa aaaa aaaaa aaaaa
                      </p>
                      <p>
                        13:30
                      </p>
                  </div>
                </div>


              </div>


              <div className="relative w-full mx-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                  <AiOutlinePaperClip className='h-5 w-5 cursor-pointer'/>
                </div>
                <input type="text" id="voice-search" className="bg-gray-50 border focus:border-none focus:ring-gray-300 focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg  block w-full max-w-90 ps-10 p-2.5 " style={{ whiteSpace: 'pre-wrap' }} placeholder="Nội dung..." required />
                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                  <BiSolidSend className='h-5 w-5 cursor-pointer'/>
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
});

export default ViewMessage;
