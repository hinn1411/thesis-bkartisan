import { FC, memo } from 'react';
import starIcon from "../../../assets/images/product/star.png";
interface ProductCardProps {
  srcImage: string;
  name: string;
  star: number;
  seller: string;
  currentCost: number;
  originalCost: number;
  percentageOfDiscount: number;
}

const ProductCard: FC<ProductCardProps> = memo(
  ({
    srcImage,
    name,
    star,
    seller,
    currentCost,
    originalCost,
    percentageOfDiscount,
  }) => {
    return <div className='container'>
      <div>
        <img src={srcImage} alt="product image" />
      </div>
      {/* Details container */}
      <div>
        <span>{star}</span>
        <div>${starIcon}</div>
      </div>
    </div>;
  }
);

export default ProductCard;
