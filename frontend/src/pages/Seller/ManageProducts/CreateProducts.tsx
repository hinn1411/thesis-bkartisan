import { FC, memo, useState, ChangeEvent } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { IoCloseOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

interface YourComponentProps {}
const CreateProducts: FC<YourComponentProps> = memo(() => {
  const [images, setImages] = useState<string[]>([]);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const initialOptions = ['S', 'M', 'L', 'XL'];
  const [availableSizes, setAvailableSizes] = useState<string[]>(initialOptions);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setSelectedSizes([...selectedSizes, newSize]);
    setAvailableSizes(availableSizes.filter(size => size !== newSize));
  };

  const removeSize = (sizeToRemove: string) => {
    setSelectedSizes(selectedSizes.filter(size => size !== sizeToRemove));
    setAvailableSizes([...availableSizes, sizeToRemove]);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

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

  const isVideoValid = async (file: File): Promise<boolean> => {
    // Check file size (in megabytes)
    const maxSizeMB = 20;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB} MB. Please choose a smaller file.`);
      return false;
    }
  
    // Check video duration (in seconds)
    const maxDurationSec = 30;
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
  
    // Wait for the video metadata to load
    await new Promise<void>((resolve) => {
      video.addEventListener('loadedmetadata',() => resolve());
    });
  
    if (video.duration > maxDurationSec) {
      alert(`Video duration exceeds ${maxDurationSec} seconds. Please choose a shorter video.`);
      return false;
    }
  
    return true;
  };
  
  const handleFileVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file && (await isVideoValid(file))) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <SellerSideBar name = "ManageProducts"/>

      <div className="p-4 sm:ml-64 mt-16">
        
        <form className="max-w-3xl mx-auto">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <input type="text" id="name" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" required/>
          </div>
          <div className="mb-4">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh (Tối đa 6 hình)</p>

            
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
              {images.length < 6 && (
                <label className="flex items-center border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <FiPlus className="w-8 h-8 text-gray-500 dark:text-gray-400"></FiPlus>
                  <input id="image" type="file" className="hidden" multiple onChange={handleFileImageChange} />
                </label>
              )}
            </div>
            
          </div>
          <div className="mb-4">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video (Tối đa 20mb)</p>
            <div className='flex space-x-2'>
              {/* video */}
              {videoSrc && (
                <div className='flex max-w-sm space-x-2'>
                  <video controls className="w-20 h-20 rounded-md" src={videoSrc} />
                </div>
              )}

              {/* file input */}
              {!videoSrc &&  (
                <label className="flex flex-col items-center justify-center border-2 p-5  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <FiPlus className="w-8 h-8 text-gray-500 dark:text-gray-400"></FiPlus>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileVideoChange}
                />
              </label>
              )
              }
            </div>
            
          </div> 
          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá sản phẩm</label>
              <input type="text" id="Price" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
              <input type="text" id="Quanlity" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
          </div>
          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chất liệu</label>
              <input type="text" id="Material" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại sản phẩm</label>
              <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7">
                <option selected>Chọn loại sản phẩm</option>
                <option value="US">Đồ trang trí</option>
                <option value="CA">Áo</option>
                <option value="FR">Quần</option>
                <option value="DE">Board Game</option>
              </select>
              
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tùy chọn (Tối đa 2)</label>
            <div className="flex mb-4 justify-between">
              <div className='w-48'>
                
                <select id="catagory" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7" onChange={handleCategoryChange}>
                  <option selected>Chọn</option>
                  <option value="US">Kích cỡ</option>
                  <option value="CA">Áo</option>
                  <option value="FR">Quần</option>
                  <option value="DE">Board Game</option>
                </select>
              </div>

              {selectedCategory && (
              <div id='select1' className='space-y-3 w-48'>
                <div className='flex items-center'>
                  <select 
                    id="size" 
                    className=" shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
                    onChange={handleSizeChange}
                    value=""
                  >
                    <option disabled value="">Chọn các kích cỡ</option>
                    {availableSizes.map(size => <option key={size} value={size}>{size}</option>)}
                  </select>
                <IoCloseOutline className="w-5 h-5 cursor-pointer" />
                </div>
                
                <div className="flex flex-wrap space-y-3">
                  {selectedSizes.map(size => (
                    <div key={size} className="flex justify-between shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full p-2.5">
                      <p>{size}</p>
                      <IoCloseOutline className="w-5 h-5 cursor-pointer" onClick={() => removeSize(size)}/>
                    </div>
                  ))}
                </div>
              </div>
                )}

              {selectedCategory && (
                <div id='select1' className='space-y-3 w-48'>
                  <div className='flex items-center'>
                    <select 
                      id="size" 
                      className=" shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-7"
                      onChange={handleSizeChange}
                      value=""
                    >
                      <option disabled value="">Chọn các kích cỡ</option>
                      {availableSizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                  <IoCloseOutline className="w-5 h-5 cursor-pointer" />
                  </div>
                  
                  <div className="flex flex-wrap space-y-3">
                    {selectedSizes.map(size => (
                      <div key={size} className="flex justify-between shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 w-full p-2.5">
                        <p>{size}</p>
                        <IoCloseOutline className="w-5 h-5 cursor-pointer" onClick={() => removeSize(size)}/>
                      </div>
                    ))}
                  </div>
                </div>
                )}
            </div>
          </div>

          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả sản phẩm</label>
            <textarea rows={4} id="Description" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " required/>
          </div>
          
          <div className='flex justify-center space-x-10 sm:space-x-40 '>
            <button type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Hủy</button>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Lưu</button>
            
          </div>
          
        </form>

      </div>
    </div>


  );
});

export default CreateProducts;
