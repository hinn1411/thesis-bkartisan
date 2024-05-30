import React from 'react';
import TableLoading from '../../ManageProducts/Components/TableLoading';
import { useProductRevenue } from '../Hooks/useQueryReport';
import { ITableReport } from '@apis/apiReportSeller';


const TableComponent: React.FC = () => {

    const { data: tableInfo, isSuccess, isFetching } = useProductRevenue()


    return (
        <table className="table-fixed w-full px-8 mt-5 border">
        
          <thead className='border-b'>
            <tr className=''>
              <th className="w-1/8 py-2 ...">Hình ảnh</th>
              <th className="w-1/8 ...">Tên</th>
              <th className="w-1/8 ...">Số lượng đã bán</th>
              <th className="w-1/8 ...">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
          {isFetching && <TableLoading />}
          {isSuccess && !isFetching && tableInfo.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">Không có sản phẩm</td>
                </tr>
          )}
            {isSuccess && !isFetching && tableInfo.result.map((data: ITableReport, index: number) => (            
              <tr key={index} className='text-center border-b hover:bg-gray-200  '>
                <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src={data.coverImage} alt="" /></td>
                <td className='px-10'>{data.name}</td>
                <td>{data.quantity}</td>
                <td>{data.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
};

export default TableComponent;
