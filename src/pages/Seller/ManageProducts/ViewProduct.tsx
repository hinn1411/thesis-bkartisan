import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Pagination from '../../../components/common/pagination/Pagination';
import { useManageProductPagination } from './Hooks/userManageProductPagination';
import { useDeleteProductMutation } from './Hooks/useProductMutation';
import _ from 'lodash'
import LineProduct from '../../../components/seller/LineProducts';
import TableLoading from './Components/TableLoading';
import { CiFilter } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { IProducts, IProductsOfSeller } from '@apis/apiProducts';
import Loading from './Components/OnLoading';
import { Success, Warnning, Error } from '@components/seller/Toast';
import { Confirm } from '@components/seller/model/Confirm';
import { ModalDetail } from './Components/ModalDetail';



const Viewproducts: FC = memo(() => {
  const mutation = useDeleteProductMutation()


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isSoldOut, setIsSoldOut] = useState<boolean | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    if (mutation.isSuccess) {
      setSelectedProductIds([]);
    }
  }, [mutation.isSuccess]);

  const { data: products, page, setPage, isSuccess, isFetching, refetch } = useManageProductPagination(searchTerm, selectedStatus, isSoldOut);


  const onFilter = () => {
    setDropdownIsOpen(false)
    refetch()
  };

  const delayedSearch = _.debounce((value: string) => {
    setSearchTerm(value);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    delayedSearch(value);
  };




  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const isChecked = event.target.checked;
    setSelectedProductIds(prevIds => {
      if (isChecked) {
        return [...prevIds, productId];
      } else {
        return prevIds.filter(id => id !== productId);
      }
    });
  };

  const handleDeleteProduct = () => {
    console.log(selectedProductIds)
    setOpenModal(false);
    mutation.mutate(selectedProductIds, {
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  }

  const handleOpenModal = () => {
    console.log(selectedProductIds.length)
    if(selectedProductIds.length > 0) {
      setOpenModal(true)
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }

  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#check_all)');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = isChecked;
    });
    setSelectedProductIds(isChecked ? products.map((product: IProducts) => product.productId) : []);
  };

  const [openModalDetail, setOpenModalDetail] = useState(false);


  return (
    <div>
      <SellerSideBar name = "ManageProducts"></SellerSideBar>
      <div className='pt-4 px-4 sm:ml-64 mt-16 max-h-[91vh] min-h-[91vh] flex flex-col justify-between'>
        <ModalDetail openModal={openModalDetail} setOpenModal={setOpenModalDetail}/>
        <Confirm openModal={openModal} onConfirmDelete={handleDeleteProduct} onClose={() => setOpenModal(false)} message='Bạn có chắc muốn xóa các sản phẩm này?'></Confirm>

        {mutation.isSuccess && <Success message='Xóa thành công.'></Success>}

        {mutation.isError && <Error message='Lỗi, vui lòng thử lại!'></Error>}

        { (mutation.isPending) && (
          <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
            <Loading></Loading>
          </div>
          )}

        { showWarning && <Warnning message='Chưa chọn sản phẩm.' /> }
      <div className="">
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link to={"/seller/manage_products/create_product"}>
              <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <FiPlus className = 'w-5 h-5' />
                <p>Thêm</p>
              </div>
            </Link>
            <div onClick={() => handleOpenModal()} className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200 cursor-pointer'>
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
            <div className='flex space-x-6'>
              <div className='mb-2'>
                <p>Trang thái sản phẩm</p>
                <div className="flex items-center mb-1">
                  <input onChange={() => setSelectedStatus("all")} checked={selectedStatus === "all"} id="date-all" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-all" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setSelectedStatus("Đang bán")} checked={selectedStatus === "Đang bán"} id="date-outdated" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-outdated" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đang bán</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setSelectedStatus("Đang duyệt")} checked={selectedStatus === "Đang duyệt"} id="date-outdated" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-outdated" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đang duyệt</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setSelectedStatus("Vi phạm")} checked={selectedStatus === "Vi phạm"} id="date-outdated" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-outdated" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vi phạm</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setSelectedStatus("Tạm ngưng")} checked={selectedStatus === "Tạm ngưng"} id="date-outdated" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-outdated" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tạm ngưng</label>
                </div>
              </div>
              <div className='mb-2'>
                <p>Số lượng hiện có</p>
                <div className="flex items-center mb-1">
                  <input onChange={() => setIsSoldOut(null)} checked={isSoldOut === null} id="num-all" type="radio" name="num" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="num-all" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setIsSoldOut(true)} checked={isSoldOut === true} id="num-sellout" type="radio" name="num" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="num-sellout" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hết hàng</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setIsSoldOut(false)} checked={isSoldOut === false} id="num-sellout" type="radio" name="num" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="num-sellout" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Còn hàng</label>
                </div>
              </div>
                <button onClick={onFilter} type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm py-1 px-2 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Lọc</button>
            </div>
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
        <table className="table-fixed w-full px-8 mt-3 border">
        
          <thead className='border-b'>
            <tr className=''>
              <th className="py-2 w-1/12 ..."><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300' type="checkbox" onChange={handleSelectAll}/></th>
              <th className="w-1/8 ...">Hình ảnh</th>
              <th className="w-1/4 ...">Tên</th>
              <th className="w-1/8 ...">Giá</th>
              <th className="w-1/8 ...">Số lượng</th>
              <th className="w-1/8 ...">Trạng thái</th>
              <th className="w-1/12 ..."></th>
            </tr>
          </thead>
          <tbody>
            {isFetching && (
              <TableLoading></TableLoading>
            )}
            {isSuccess && !isFetching && products.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4">Không có sản phẩm</td>
                </tr>
          )}
            {isSuccess && !isFetching && (
              <>
                {products.map((product: IProductsOfSeller) => (
                <LineProduct key={product.productId} {...product} isSelected={selectedProductIds.includes(product.productId)} 
                onCheckboxChange={(event: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event, product.productId)} setOpenModal={setOpenModalDetail}/>
              ))}
              </>
            )}
            
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

export default Viewproducts;
