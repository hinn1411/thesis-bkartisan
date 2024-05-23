import { FC, memo, useEffect, useState } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useParams } from 'react-router-dom';
import { useQueryDiscountDetail } from './Hooks/useQueryDiscount';
import { useUpdateDiscount } from './Hooks/useMutationDiscount';
import Loading from '../ManageProducts/Components/OnLoading';
import { SuccessAdd } from '@components/seller/model/SuccessAdd';
import { FailureAdd } from '@components/seller/model/FailureAdd';
import DetailLoading from '@components/seller/DetailLoading';
import { parseInt } from 'lodash';

interface YourComponentProps {}

const ChangeDiscount: FC<YourComponentProps> = memo(() => {
  const { discountId } = useParams<{ discountId: string }>();

  const id = parseInt(discountId ? discountId : "0");

  const { data: discount, isSuccess, isFetching } = useQueryDiscountDetail(id);
  const updateDiscount = useUpdateDiscount()

  const [data, setData] = useState({
    discountId: id,
    code: '',
    startedAt: '',
    validUntil: '',
    type: '',
    quantity: 0,
    details: {
      value: 0,
      lowerBound: 0,
    }
  });

  const [formChanged, setFormChanged] = useState<boolean>(false);


  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [errorDateStart, setErrorDateStart] = useState("");
  const [errorDateEnd, setErrorDateEnd] = useState("");
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    if (isSuccess && discount) {
      console.log(discount.data)
      const data = discount.data
      setData({
        discountId: data.id,
        code: data.code,
        startedAt: data.startedAt,
        validUntil: data.validUntil,
        type: data.type,
        quantity: data.quantity,
        details: {
          value: data.details.value,
          lowerBound: data.details.lowerBound || 0,
        },
      });
      setStartDate(new Date(data.startedAt));
      setEndDate(new Date(data.validUntil));
    }
  }, [isSuccess, discount]);

  const formatDateForDatabase = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleStartDateChange: ReactDatePickerProps['onChange'] = (date) => {
    const currentDate = new Date();
    setErrorDateStart("");
    if (date && date < currentDate) {
      setErrorDateStart("Ngày bắt đầu không được nhỏ hơn ngày hiện tại.");
      return;
    }
    if (date && endDate && date >= endDate) {
      setErrorDateStart("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }
    setStartDate(date);
    setData({ ...data, startedAt: formatDateForDatabase(date) });
    setFormChanged(true);
  };

  const handleEndDateChange: ReactDatePickerProps['onChange'] = (date) => {
    setErrorDateEnd("");
    if (date && startDate && date <= startDate) {
      setErrorDateEnd("Ngày kết thúc không được nhỏ hơn ngày bắt đầu.");
      return;
    }
    setEndDate(date);
    setData({ ...data, validUntil: formatDateForDatabase(date) });
    setFormChanged(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'code') {
      const alphanumericPattern = /^[a-zA-Z0-9]{0,6}$/;
      if (!alphanumericPattern.test(value)) {
        setErrorCode("Mã giảm giá chỉ được chứa các ký tự a-z A-Z 0-9 và tối đa 6 ký tự.");
        return;
      } else {
        setErrorCode("");
      }
    }
    setData({
      ...data,
      [name]: name === 'quantity' ? parseInt(value, 10) : value,
    });
    setFormChanged(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const discountDataNormal = {
      discountId: id,
      code: data.code,
      startedAt: data.startedAt,
      validUntil: data.validUntil,
      type: data.type,
      quantity: data.quantity,
      details: {
        value: data.details.value
      }
    }
    if(data.type === "bill") {
      updateDiscount.mutate(data);
    }
    else{
      updateDiscount.mutate(discountDataNormal);
    }
  }

  const handleMutationSuccess = () => {
  };


  return (
    <div>
      <SellerSideBar name="ManageDiscounts" />

      <div className="p-4 sm:ml-64 mt-16">


      {updateDiscount.isPending && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <Loading></Loading>
        </div>
      )}
      {
        updateDiscount.isSuccess && (
          <SuccessAdd message='Cập nhật mã thành công' url='/seller/manage_discounts' onDismiss={handleMutationSuccess}></SuccessAdd>
        )
      }
      {
        updateDiscount.isError && (
          <FailureAdd ></FailureAdd>
        )
      }
        <form className="max-w-3xl mx-auto" onSubmit={onSubmit}>
          {
            isFetching && <DetailLoading></DetailLoading>
          }

          {
            isSuccess && !isFetching && (
          <div>
          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã giảm giá</label>
              <input
                disabled
                type="text" 
                id="code" 
                name="code" 
                className="max-w-48 shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " 
                value={data.code} 
                onChange={handleInputChange} 
                required 
              />
              {errorCode && (<p className='text-sm text-red-500'>{errorCode}</p>)}
            </div>
          </div>

          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại mã giảm</label>
              <select 
                id="type" 
                name="type" 
                className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                value={data.type}
                onChange={handleInputChange}
              >
                <option value="">Chọn loại mã giảm</option>
                <option value="percent">Giảm theo phần trăm</option>
                <option value="fixed">Giảm cố định</option>
                <option value="bill">Giảm theo đơn hàng</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá trị giảm</label>
              <input 
                min="0" 
                type="number" 
                id="value" 
                name="details.value" 
                className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " 
                value={data.details.value}
                onChange={(e) => setData({ ...data, details: { ...data.details, value: parseFloat(e.target.value) }})}
                required 
              />
            </div>
            {data.type === "bill" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá trị đơn tối thiểu</label>
                <input 
                  min="0" 
                  type="number" 
                  id="lowerBound" 
                  name="details.lowerBound" 
                  className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " 
                  value={data.details.lowerBound}
                  onChange={(e) => setData({ ...data, details: { ...data.details, lowerBound: parseFloat(e.target.value) }})}
                  required 
                />
              </div>
            )}
          </div>
          
          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu</label>
              <div className='flex items-center'>
                <DatePicker
                  selected={startDate} // Pass selected date
                  dateFormat="dd/MM/yyyy"
                  className='shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 '
                  placeholderText="Select date"
                  onChange={handleStartDateChange} // Add onChange prop
                />
              </div>
              {errorDateStart && (<p className='text-sm text-red-500'>{errorDateStart}</p>)}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc</label>
              <div className='flex items-center'>
                <DatePicker
                  selected={endDate} // Pass selected date
                  dateFormat="dd/MM/yyyy"
                  className='shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 '
                  placeholderText="Select date"
                  onChange={handleEndDateChange} // Add onChange prop
                />
              </div>
              {errorDateEnd && (<p className='text-sm text-red-500'>{errorDateEnd}</p>)}
            </div>
          </div>

          <div className="flex mb-10 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
              <input 
                min="0" 
                type="number" 
                id="quantity" 
                name="quantity" 
                className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " 
                value={data.quantity}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          
          {
            formChanged && (
              <div className='flex justify-center space-x-10 sm:space-x-40 '>
                <button type="button" className="border border-orange-500 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:focus:ring-orange-800"><Link to='/seller/manage_discounts'>Hủy</Link></button>
                <button type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Thêm</button>
              </div>
            )
          }
          </div>
            )
          }
          
          
        </form>
      </div>
    </div>
  );
});

export default ChangeDiscount;
