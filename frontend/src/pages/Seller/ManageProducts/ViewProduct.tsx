import { ChangeEvent, FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import Pagination from '../../../components/common/pagination/Pagination';
import { useManageProductPagination } from './Hooks/userManageProductPagination';
import { useDeleteProductMutation } from './Hooks/useProductMutation';
import _ from 'lodash'
import LineProduct, {
  ProductLineProps
} from '../../../components/seller/LineProducts';
import TableLoading from './Components/TableLoading';



const Viewproducts: FC = memo(() => {
  const mutation = useDeleteProductMutation()


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  console.log(selectedProductIds)
  mutation.isSuccess ? setSelectedProductIds([]) : null;

  const { data: products, page, setPage, isSuccess, isFetching } = useManageProductPagination(searchTerm, selectedFilter);

  const handleDeleteProduct = () => {
    mutation.mutate(selectedProductIds)
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

  


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#check_all)');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = isChecked;
    });
    setSelectedProductIds(isChecked ? products.map((product: ProductLineProps) => product.id) : []);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleOptionClick = (option: string) => {
    setSelectedFilter(option);
    setIsDropdownOpen(false); // close dropdown after selecting an option
};

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


  return (
    <div>
      <SellerSideBar name = "ManageProducts"></SellerSideBar>
      <div className='pt-4 px-4 sm:ml-64 mt-16 max-h-[91vh] min-h-[91vh] flex flex-col justify-between'>
      <div className="">
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link to={"/seller/manage_products/create_product"}>
              <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <FiPlus className = 'w-5 h-5' />
                <p>Thêm</p>
              </div>
            </Link>
            <div onClick={handleDeleteProduct} className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
              <PiTrashLight className = 'w-5 h-5'/>
              <p className='pr-4'>Xóa</p>
            </div>
            <div className='w-auto'>
              <div onClick={toggleDropdown} className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
                  <CiFilter className='w-5 h-5'/>
                  <p>Lọc</p>
                  <IoIosArrowDown className='w-5 h-5'/>
              </div>
              <div className={`${isDropdownOpen ? '' : 'hidden'} absolute border rounded-lg min-w-32 bg-white mt-1`}>
                  <p className='border-b hover:bg-gray-300 px-2 cursor-pointer' onClick={() => handleOptionClick('OnSale')}>Đang bán</p>
                  <p className='border-b hover:bg-gray-300 px-2 cursor-pointer' onClick={() => handleOptionClick('approve')}>Đang duyệt</p>
                  <p className='border-b hover:bg-gray-300 px-2 cursor-pointer' onClick={() => handleOptionClick('V')}>Vi phạm</p>
                  <p className='border-b hover:bg-gray-300 px-2 cursor-pointer' onClick={() => handleOptionClick('NotOnsale')}>Tạm ngưng</p>
                  <p className='border-b hover:bg-gray-300 px-2 cursor-pointer' onClick={() => handleOptionClick('Hết hàng')}>Hết hàng</p>
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
            )

            }
            {isSuccess && !isFetching && (
              <>
                {products.map((product: ProductLineProps) => (
                <LineProduct key={product.id} {...product} isSelected={selectedProductIds.includes(product.id)} 
                onCheckboxChange={(event: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event, product.id)}/>
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
