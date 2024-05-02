import { FC, memo, useState, ChangeEvent } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';

interface YourComponentProps {}
const CreateGift: FC<YourComponentProps> = memo(() => {
  const [images, setImages] = useState<string[]>([]);

  const handleFileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newImages: string[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const imageFiles = URL.createObjectURL(files[i]);
        newImages.push(imageFiles);
      }

      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };



  return (
    <div>
      <SellerSideBar name = "ManageGift"/>

      <div className="p-4 sm:ml-64 mt-16">
        
        <form className="max-w-3xl mx-auto">
            <div className="flex mb-4">
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại phụ kiện</label>
                <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7">
                    <option selected>Chọn loại phụ kiện</option>
                    <option value="box">Hộp quà</option>
                    <option value="card">Thiệp quà</option>
                </select>
                </div>
            </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <input type="text" id="name" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" required/>
          </div>
          <div className="mb-4">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh</p>

            
            <div className='flex'>
              {/* list hình ảnh */}
              <div className='flex max-w-2xl space-x-2'>
                {images.map((imageFiles, index) => (
                  <div key={index} className='relative group'>
                    <img className='w-20 h-20 rounded-md' src={imageFiles} alt={`Image ${index + 1}`} />
                    <div className='absolute top-0 right-0 flex items-center w-4 h-4 text-white bg-red-500 rounded-full p-1 cursor-pointer'
                      onClick={() => handleRemoveImage(index)}>
                      -
                    </div>
                  </div>
                ))}
              </div>
              {images.length < 1 && (
                <label className="flex items-center border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <FiPlus className="w-8 h-8 text-gray-500 dark:text-gray-400"></FiPlus>
                  <input id="image" type="file" className="hidden" multiple onChange={handleFileImageChange} />
                </label>
              )}
            </div>
            
          </div>

          <div className="flex mb-10">
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá sản phẩm</label>
            <input type="text" id="Price" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
          </div>
          

          
          <div className='flex justify-center space-x-10 sm:space-x-40 '>
            <Link to={"/seller/manage_gift"}>
            <button type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Hủy</button>
            </Link>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Thêm</button>
            
          </div>
          
        </form>

      </div>
    </div>


  );
});

export default CreateGift;
