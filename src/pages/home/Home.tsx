import {FC, memo} from "react";
import CategoryCard from "../../components/common/category/CategoryCard";
import cateImage1 from "../../assets/images/category/img.png";
import cateImage2 from '../../assets/images/category/img2.png';
import cateImage3 from "../../assets/images/category/img3.png";
import cateImage4 from '../../assets/images/category/img4.png';
import cateImage5 from '../../assets/images/category/img5.png';
import cateImage6 from '../../assets/images/category/img6.png';
const Home:FC = memo(() => {
  return (
    <main className="h-screen px-20">
      <h1 className="text-3xl text-center mt-5 font-medium">Quà nổi bật</h1>
      {/* Image container */}
      <div className="flex flex-row items-center justify-evenly text-base space-x-2 my-8 border-b-2 pb-8 border-b-gray-300">
        <CategoryCard srcImage={cateImage1} categoryName="Quà kỷ niệm" />
        <CategoryCard srcImage={cateImage2} categoryName="Quà cho nữ" />
        <CategoryCard srcImage={cateImage3} categoryName="Quà cho nam" />
        <CategoryCard srcImage={cateImage4} categoryName="Quà cho trẻ em" />
        <CategoryCard srcImage={cateImage5} categoryName="Quà cho gia đình" />
        <CategoryCard srcImage={cateImage6} categoryName="Quà độc lạ" />
      </div>
    </main>
  );
});

export default Home;