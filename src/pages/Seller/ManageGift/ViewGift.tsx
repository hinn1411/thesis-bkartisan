import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useGiftPagination } from './Hooks/useQueryGift';
import { useDeleteGift } from './Hooks/useMutationGift';
import { IGift } from '@apis/apiGift';
import Pagination from '@components/common/pagination/Pagination';
import TableLoading from '../ManageProducts/Components/TableLoading';
import { Confirm } from '@components/seller/model/Confirm';
import { Success, Warnning, Error } from '@components/seller/Toast';
import Loading from '../ManageProducts/Components/OnLoading';
import _ from 'lodash';

const ViewGift: FC = memo(() => {

  const deleteGiftMutation = useDeleteGift()

  const [type, setType] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiscountIds, setSelectedDiscountIds] = useState<number[]>([]);
  const [showWarning, setShowWarning] = useState(false);



  const { data: gifts, page, setPage, isSuccess, isFetching } = useGiftPagination(typeFilter, searchTerm);


  const onFilter = () => {
    setTypeFilter(type)
    setDropdownIsOpen(false)
  };

  const handleDeleteGift = () => {
    console.log(selectedDiscountIds)
    setOpenModal(false);
    deleteGiftMutation.mutate(selectedDiscountIds, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  }

  const handleOpenModal = () => {
    console.log(selectedDiscountIds.length)
    if(selectedDiscountIds.length > 0) {
      setOpenModal(true)
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }

  }

  const delayedSearch = _.debounce((value: string) => {
    setSearchTerm(value);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    delayedSearch(value);
  };


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectedDiscountIds(isChecked ? gifts.map((gift: IGift) => gift.giftId) : []);
    console.log(selectedDiscountIds)
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isChecked = event.target.checked;
    setSelectedDiscountIds((prevSelected) =>
        isChecked
            ? prevSelected.includes(id) ? prevSelected : [...prevSelected, id]
            : prevSelected.filter((discountId) => discountId !== id)
    );
    console.log(selectedDiscountIds)
};




  return (
    <div>
      <SellerSideBar name = "ManageGift"></SellerSideBar>
      <div className='pt-4 px-4 sm:ml-64 mt-16 max-h-[91vh] min-h-[91vh] flex flex-col justify-between'>

      <Confirm openModal={openModal} onConfirmDelete={handleDeleteGift} onClose={() => setOpenModal(false)} message='Bạn có chắc muốn xóa sản phẩm này?'></Confirm>

      {deleteGiftMutation.isSuccess && <Success message='Xóa thành công.'></Success>}

      {deleteGiftMutation.isError && <Error message='Lỗi, vui lòng thử lại!'></Error>}
      
      { (deleteGiftMutation.isPending) && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <Loading></Loading>
        </div>
        )}

        { showWarning && <Warnning message='Chưa chọn sản phẩm.' /> }


      <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link to={"/seller/manage_gift/create_gift"}>
              <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <FiPlus className = 'w-5 h-5' />
                <p>Thêm</p>
              </div>
            </Link>
            <div onClick={() => handleOpenModal()} className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
              <PiTrashLight className = 'w-5 h-5'/>
              <p className='pr-4'>Xóa</p>
            </div>
            <div>
            <div onClick={() => setDropdownIsOpen(!dropdownIsOpen)} className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
              <CiFilter className = 'w-5 h-5'/>
              <p>Lọc</p>
              <IoIosArrowDown className = 'w-5 h-5'/>
            </div>
            <div className={`${dropdownIsOpen ? '' : 'hidden'} z-10 absolute bg-white rounded-xl shadow p-2 mt-2`}>
                <div className='mb-2'>
                  {/* <p>Loại mã</p> */}
                  <div className="flex items-center mb-1">
                    <input onChange={() => setType("all")} checked={type === "all"} id="type-all" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="type-all" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input onChange={() => setType("box")} checked={type === "box"} id="type-percent" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="type-percent" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hộp quà</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input onChange={() => setType("card")} checked={type === "card"} id="type-fixed" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="type-fixed" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giảm theo cố định</label>
                  </div>
                  
                </div>
                <button onClick={onFilter} type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm py-1 px-2 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Lọc</button>
            </div>
            </div>
          </div>
          <div className="max-w-md">   
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input onChange={handleSearchChange} type="search" id="default-search" className="block w-full p-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500" placeholder="Tìm kiếm sản phẩm" required />
                  
              </div>
          </div>
        </div>
        <table className="table-fixed w-full px-8 mt-5 border">
        
          <thead className='border-b'>
            <tr className=''>
              <th className="py-2 w-1/12 ..."><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300' type="checkbox" onChange={handleSelectAll}/></th>
              <th className="w-1/8 ...">Hình ảnh</th>
              <th className="w-1/4 ...">Tên</th>
              <th className="w-1/8 ...">Giá</th>
              <th className="w-1/12 ..."></th>
            </tr>
          </thead>
          <tbody>
          {isFetching && <TableLoading />}
          {isSuccess && !isFetching && gifts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">Không có sản phẩm</td>
                </tr>
          )}
            {isSuccess && !isFetching && gifts.map((gift: IGift) => (               
              <tr key={gift.giftId} className='text-center border-b hover:bg-gray-200  '>
                <td><input id='check_1' className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" onChange={(e) => handleCheckboxChange(e, gift.giftId)}/></td>
                <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src={gift.coverImage} alt="" /></td>
                <td className='px-10'>{gift.name}</td>
                <td>{gift.price}</td>
                <td className='text-blue-600'><Link to={`/seller/manage_gift/change_gift/${gift.giftId}`}>Sửa</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination currentPage={page} goToPage={setPage} />
      </div>
      </div>
    </div>
  );
});

export default ViewGift;
