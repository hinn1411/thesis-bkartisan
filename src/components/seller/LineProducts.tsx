import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

export interface ProductLineProps {
    id: number;
    srcImage: string;
    name: string;
    star: number;
    originalCost: number;
  }

interface LineProductProps extends ProductLineProps {
  isSelected: boolean;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LineProduct: FC<LineProductProps> = memo(
    ({
      isSelected, 
      onCheckboxChange,
      srcImage,
      name,
      originalCost,

    }) => {

  return (

        <tr className='text-center border-b hover:bg-gray-200'>
            <td><input className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" checked={isSelected} onChange={onCheckboxChange}/></td>
            <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src={srcImage} alt="" /></td>
            <td className='px-10 truncate'>{name}</td>
            <td>{originalCost}</td>
            <td>10</td>
            <td>Đang bán</td>
            <td className='text-blue-600'><Link to="/seller/manage_products/detail/1">Sửa</Link></td>
        </tr>
  );
});

export default LineProduct;
