import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { IProductsOfSeller } from '@apis/apiProducts';



interface LineProductProps extends IProductsOfSeller {
  isSelected: boolean;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LineProduct: FC<LineProductProps> = memo(
    ({
      isSelected, 
      onCheckboxChange,
      coverImage,
      name,
      price,
      status,
      quantity,

    }) => {

  return (

        <tr className='text-center border-b hover:bg-gray-200'>
            <td><input className='rounded-sm bg-white focus:ring-2 focus:ring-orange-300' type="checkbox" checked={isSelected} onChange={onCheckboxChange}/></td>
            <td className='flex justify-center'><img className='w-30 h-20 p-1 rounded-lg' src={coverImage} alt="" /></td>
            <td className='px-10 truncate'>{name}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{status}</td>
            <td className='text-blue-600'><Link to="/seller/manage_products/detail/1">Sửa</Link></td>
        </tr>
  );
});

export default LineProduct;
