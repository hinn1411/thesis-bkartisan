import { FC, memo, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { PiTrashLight } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDiscountPagination } from './Hooks/useQueryDiscount';
import { useDeleteDiscount } from './Hooks/useMutationDiscount';
import Pagination from '@components/common/pagination/Pagination';
import TableLoading from '../ManageProducts/Components/TableLoading';
import Loading from '../ManageProducts/Components/OnLoading';
import { Warnning } from '@components/seller/Toast';
import { Confirm } from '@components/seller/model/Confirm';
import { IDiscount } from '@apis/apiDiscounts';

const ViewDiscounts: FC = memo(() => {
  const deleteDiscount = useDeleteDiscount()

  const [query, setQuery] = useState({
    type: "",
    filter: ""  
  });

  const [date, setDate] = useState("");
  const [num, setNum] = useState("");
  const [type, setType] = useState("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiscountIds, setSelectedDiscountIds] = useState<number[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const { data: discounts, page, setPage, isSuccess, isFetching } = useDiscountPagination(query);

  if(isSuccess) {
    console.log(discounts);
  }

  const onFilter = () => {
    let filter = "";

    if(date) {
      filter += date;
    }

    if(num) {
      filter += (filter ? "," : "") + num;
    }

    setQuery({ ...query, type: type, filter });
    setDropdownIsOpen(false)
  };

  const handleDeleteDiscount = () => {
    setOpenModal(false);
    deleteDiscount.mutate(selectedDiscountIds[0], {
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


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectedDiscountIds(isChecked ? discounts.map((discount: IDiscount) => discount.id) : []);
    console.log(selectedDiscountIds)
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isChecked = event.target.checked;
    setSelectedDiscountIds((prevSelected) =>
      isChecked ? [...prevSelected, id] : prevSelected.filter((discountId) => discountId !== id)
    );
    console.log(selectedDiscountIds)
  };

  

  return (
    <div>
      <SellerSideBar name="ManageDiscounts"></SellerSideBar>


      <div className='pt-4 px-4 sm:ml-64 mt-16 max-h-[91vh] min-h-[91vh] flex flex-col justify-between'>

      <Confirm openModal={openModal} onConfirmDelete={handleDeleteDiscount} onClose={() => setOpenModal(false)} message='Bạn có chắc muốn xóa mã này?'></Confirm>

        { (deleteDiscount.isPending) && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <Loading></Loading>
        </div>
        )}

        { showWarning && <Warnning message='Chưa chọn mã.' /> }

        <div>
        <div className='flex items-center space-x-4'>
          <Link to={"/seller/manage_discounts/create_discount"}>
            <div className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 rounded-xl text-gray-500 hover:bg-gray-200'>
              <FiPlus className='w-5 h-5' />
              <p>Thêm</p>
            </div>
          </Link>
          <div onClick={() => handleOpenModal()} className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
            <PiTrashLight className='w-5 h-5' />
            <p className='pr-4'>Xóa</p>
          </div>
          <div>
            <div onClick={() => setDropdownIsOpen(!dropdownIsOpen)} className='flex items-center space-x-2 drop-shadow-lg border w-25 px-3 rounded-xl text-gray-500 hover:bg-gray-200 cursor-pointer'>
              <CiFilter className='w-5 h-5' />
              <p>Lọc</p>
              <IoIosArrowDown className='w-5 h-5' />
            </div>
            <div className={`${dropdownIsOpen ? '' : 'hidden'} z-10 absolute bg-white rounded-xl shadow p-2 mt-2`}>
            <div className='flex space-x-6'>
              <div className='mb-2'>
                <p>Thời hạn mã</p>
                <div className="flex items-center mb-1">
                  <input onChange={() => setDate("")} checked={date === ""} id="date-all" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-all" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setDate("isOutdated")} checked={date === "isOutdated"} id="date-outdated" type="radio" name="date" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="date-outdated" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hết hạn</label>
                </div>
              </div>
              <div className='mb-2'>
                <p>Số lượng mã</p>
                <div className="flex items-center mb-1">
                  <input onChange={() => setNum("")} checked={num === ""} id="num-all" type="radio" name="num" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="num-all" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setNum("isSellOut")} checked={num === "isSellOut"} id="num-sellout" type="radio" name="num" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="num-sellout" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hết mã</label>
                </div>
              </div>
              <div className='mb-2'>
                <p>Loại mã</p>
                <div className="flex items-center mb-1">
                  <input onChange={() => setType("")} checked={type === ""} id="type-all" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="type-all" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tất cả</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setType("percent")} checked={type === "percent"} id="type-percent" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="type-percent" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giảm theo phần trăm</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setType("fixed")} checked={type === "fixed"} id="type-fixed" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="type-fixed" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giảm theo cố định</label>
                </div>
                <div className="flex items-center mb-1">
                  <input onChange={() => setType("bill")} checked={type === "bill"} id="type-bill" type="radio" name="type" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="type-bill" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giảm theo đơn hàng</label>
                </div>
              </div>
              
            </div>
            <button onClick={onFilter} type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 h-10 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Lọc</button>
            </div>
           
          </div>
        </div>
        <table className="table-fixed w-full px-8 mt-5 border">
          <thead className='border-b'>
            <tr>
              <th className="py-2 w-1/12"><input id='check_all' className='rounded-sm focus:ring-3 focus:ring-orange-300' type="checkbox" onChange={handleSelectAll} /></th>
              <th className="w-1/12">Mã</th>
              <th className="w-1/8">Loại mã giảm</th>
              <th className="w-1/8">Giá trị giảm</th>
              <th className="w-1/8">Ngày bắt đầu</th>
              <th className="w-1/8">Ngày hết hạn</th>
              <th className="w-1/8">Số lượng</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {isFetching && <TableLoading />}
            {isSuccess && !isFetching && discounts.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4">Không có mã giảm giá</td>
                </tr>
            )}
            {isSuccess && !isFetching && discounts.map((discount: IDiscount) => (
              
              <tr key={discount.id} className='text-center border-b hover:bg-gray-200'>
                <td className='py-2'><input className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" onChange={(e) => handleCheckboxChange(e, discount.id)}/></td>
                <td>{discount.code}</td>
                <td>{discount.type === "percent" ? "Giảm theo %" : discount.type === "bill" ? "Giảm theo đơn hàng" : "Giảm cố định"}</td>
                <td>{discount.details.value}</td>
                <td>{new Date(discount.startedAt).toLocaleDateString()}</td>
                <td>{new Date(discount.validUntil).toLocaleDateString()}</td>
                <td>{discount.quantity}</td>
                <td className='text-orange-600'><Link to={`/seller/manage_discounts/change_discount/${discount.id}`}>Sửa</Link></td>
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

export default ViewDiscounts;
