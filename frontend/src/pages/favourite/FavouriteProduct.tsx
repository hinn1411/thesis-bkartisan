import { FC, memo } from 'react';
import productImage1 from '../../assets/images/product/item1.png';
import FavouriteCard from '../../components/common/favourite/FavoutiteCard';
import Pagination from '../../components/common/pagination/Pagination';

const FavouriteProduct: FC = memo(() => {
    return (
        <main className="min-h-screen px-20 my-5">
            <div className='text-xl my-2'>
                <span>
                    Tổng số sản phẩm yêu thích: 30
                </span>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={true}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={false}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={false}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={true}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={false}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={true}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={false}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={false}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={false}
                />
                <FavouriteCard
                srcImage={productImage1}
                name="Christmas suncatcher stained glass..."
                star={4.7}
                seller="sadboizaintcry"
                numOfRating={113}
                currentCost={123000}
                originalCost={300000}
                percentageOfDiscount={45}
                isNew={true}
                />
            </div>

            <Pagination />
        </main> 
    );

});

export default FavouriteProduct;