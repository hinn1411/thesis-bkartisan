import { FC, memo, useState, ChangeEvent, FormEvent } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import { FiPlus } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import Loading from './Components/OnLoading';
import {useCreateProductMutation} from "./Hooks/useProductMutation"
import DropdownCategory from './Components/DropdownCategory';
import DropdownOption from './Components/DropdownOption';
import DropdownChooseOption from './Components/DropdownChooseOption';
import { ICategorys } from '../../../apis/apiCategory';
import { useProductCategorys, useOptions, useChooseOptions1, useChooseOptions2 } from './Hooks/useQuery';
import { SuccessAdd } from '../../../components/seller/model/SuccessAdd';
import { FailureAdd } from '../../../components/seller/model/FailureAdd';

interface YourComponentProps {
  
}
const CreateProducts: FC<YourComponentProps> = memo(() => {
  const mutation = useCreateProductMutation();

  const { data: categorys } = useProductCategorys();
  const categoryNames = categorys ? categorys.map((category: ICategorys) => category.name) : [];

  const { data: options } = useOptions();
  
  const [images, setImages] = useState<File[]>([]);
  const [videoSrc, setVideoSrc] = useState<File>();
  const [selectedChooseOptions1, setSelectedChooseOptions1] = useState<string[]>([]);
  const [selectedChooseOptions2, setSelectedChooseOptions2] = useState<string[]>([]); 
  const [isVisibleOption1, setIsVisibleOption1] = useState<boolean>(false); 
  const [isVisibleOption2, setIsVisibleOption2] = useState<boolean>(false); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');

  const [errorImg, setErrorImg] = useState("");

  const [errorVideo, setErrorVideo] = useState("");


  const { data: chooseOptions1, isFetching: isLoading1 } = useChooseOptions1(selectedOption1);

  const { data: chooseOptions2, isFetching: isLoading2 } = useChooseOptions2(selectedOption2);


  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };
  

  const handleSelectOption1 = (option: string) => {
    setSelectedOption1(option)
    setIsVisibleOption1(true);
    
  }

  const handleSelectOption2 = (option: string) => {
    setSelectedOption2(option)
    setIsVisibleOption2(true);
    
  }

  const [formDatas, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    material: '',
    description: '',
  });
  

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formDatas, [name]: value });
    console.log(formDatas)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if(!videoSrc) {
      setErrorVideo("Vui lòng thêm video sản phẩm!")
      return;
    }
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', formDatas.name);
    formData.append('price', String(formDatas.price));
    formData.append('quantity', String(formDatas.quantity));
    formData.append('material', formDatas.material);
    formData.append('category', selectedCategory);
    formData.append('description', formDatas.description);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append('option1', selectedOption1);
    for (const chooseOptions1 of selectedChooseOptions1) {
      formData.append("chooseOptions1", chooseOptions1);
    }
    formData.append('option2', selectedOption2);
    for (const chooseOptions2 of selectedChooseOptions2) {
      formData.append("chooseOptions2", chooseOptions2);
    }
    if (videoSrc) {
      formData.append('videos', videoSrc);
    }
    mutation.mutate(formData);
  };


  const handleFileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newImages: File[] = [];

    if (files) {
      setErrorImg('');
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

            // Check file type
            if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                const error = "Hình ảnh chỉ hỗ trợ kiểu jpg, jpeg, png và gif.";
                setErrorImg(error);
                return;
            }

            // Check file size
            if (file.size > 5000000) {
                const error = "File không được lớn hơn 5MB.";
                setErrorImg(error);
                return;
            }
        newImages.push(file);
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
    setErrorVideo('')
    // Check file size (in megabytes)
    const maxSizeMB = 20;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorVideo(`Kích thước tệp vượt quá ${maxSizeMB} MB. Vui lòng chọn một tập tin nhỏ hơn.`);
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
      setErrorVideo(`Độ dài video vượt quá ${maxDurationSec} giây. Vui lòng chọn video ngắn hơn.`);
      return false;
    }
  
    return true;
  };
  
  const handleFileVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file && (await isVideoValid(file))) {
      setVideoSrc(file);
    }
  };


    // Hàm xử lý sự kiện khi tùy chọn thay đổi
    const handleOptionChange1 = (option:string) => {
        setSelectedChooseOptions1(prevOptions => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option];
            }
            return prevOptions;
        });
    };
    const handleOptionChange2 = (option:string) => {
      setSelectedChooseOptions2(prevOptions => {
          if (!prevOptions.includes(option)) {
              return [...prevOptions, option];
          }
          return prevOptions;
      });
  };

    // Hàm xử lý sự kiện khi icon được nhấp
    const handleRemoveOption = (optionToRemove: string, setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>) => {
      setSelectedOptions(prevOptions => prevOptions.filter(option => option !== optionToRemove));

  };
    // Hàm xử lý sự kiện khi click vào icon trong select
    const handleIconClick = (selectId: string) => {
      if (selectId === 'category1') {
          setIsVisibleOption1(prevVisible => !prevVisible);
      } else if (selectId === 'category2') {
          setIsVisibleOption2(prevVisible => !prevVisible);
      }
      
  };

  const handleMutationSuccess = () => {
    // Xóa hết dữ liệu đã lưu
    setImages([]);
    setVideoSrc(undefined);
    setSelectedChooseOptions1([]);
    setSelectedChooseOptions2([]);
    setIsVisibleOption1(false);
    setIsVisibleOption2(false);
    setSelectedCategory("");
    setSelectedOption1('');
    setSelectedOption2('');
    setFormData({
      name: '',
      price: 0,
      quantity: 0,
      material: '',
      description: '',
    });
  };


  return (
    <div>
      <SellerSideBar name = "ManageProducts"/>

      <div className="p-4 sm:ml-64 mt-16 relative">


      { mutation.isPending && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
          <Loading></Loading>
        </div>
      )
      }

      {
        mutation.isSuccess && (
          <SuccessAdd onDismiss={handleMutationSuccess}></SuccessAdd>
        )
      }
      {
        mutation.isError && (
          <FailureAdd ></FailureAdd>
        )
      }

        <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <input type="text" id="name" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" name="name" value={formDatas.name} onChange={handleChange} required/>
          </div>
          <div className="mb-4">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh (Tối đa 6 hình)</p>

            <div>
            <div className='flex'>
              {/* list hình ảnh */}
              <div className='flex max-w-2xl space-x-2'>
                {errorImg == '' && images.map((imageFiles, index) => (
                  <div key={index} className='relative group'>
                    <img className='w-20 h-20 rounded-md' src={URL.createObjectURL(imageFiles)} alt={`Image ${index + 1}`} />
                    <div className='absolute top-0 right-0 flex items-center w-4 h-4 text-white bg-red-500 rounded-full p-1 cursor-pointer'
                      onClick={() => handleRemoveImage(index)}>
                      -
                    </div>
                  </div>
                ))}
              </div>
              {images.length < 6 && (
                <label className="flex items-center border-2 p-5 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                  <FiPlus className="w-8 h-8 text-gray-500 dark:text-gray-400"></FiPlus>
                  <input id="image" type="file" className="hidden" multiple onChange={handleFileImageChange} />
                </label>
              )}
            </div>
            {errorImg != '' && (<p className='text-sm text-red-500'>{errorImg}</p>)}
            </div>
          </div>
          <div className="mb-4">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video (Tối đa 20mb)</p>
            <div className='flex space-x-2'>
              {/* video */}
              {videoSrc && (
                <div className='flex max-w-sm space-x-2'>
                  <video controls className="w-20 h-20 rounded-md" src={URL.createObjectURL(videoSrc)} />
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
            {errorVideo != '' && (<p className='text-sm text-red-500'>{errorVideo}</p>)}
          </div> 
          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá sản phẩm</label>
              <input min="0" type="number" id="Price" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " name="price" value={formDatas.price} onChange={handleChange} required/>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
              <input min="0" type="number" id="Quanlity" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " name="quantity" value={formDatas.quantity} onChange={handleChange} required/>
            </div>
          </div>
          <div className="flex mb-4 justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chất liệu</label>
              <input type="text" id="Material" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " name="material" value={formDatas.material} onChange={handleChange} required/>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại sản phẩm</label>
              <DropdownCategory name='Chọn loại sản phẩm' categoryNames={categoryNames} onSelectCategory={handleSelectCategory}/>
              
            </div>
          </div>

          <div className="flex mb-4 space-x-10">
            <div id="option1" >
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tùy chọn 1</label>
              <DropdownOption name='Tùy chọn sản phẩm' optionNames={options} onSelectOption={handleSelectOption1} on={isVisibleOption1}/>
            </div>
            {(isLoading1 ? (
              <Loading></Loading>
            ) : (
              <div id="choose-option1" className={`space-y-5 mt-7 ${isVisibleOption1 ? '' : 'hidden'}`}>
              <div className='flex items-center space-x-2 ' >
                <LiaTimesSolid className='h-5 w-5 cursor-pointer' onClick={() => handleIconClick('category1')}/>
                <DropdownChooseOption name='Chọn' optionNames={chooseOptions1} handleOptionChange={handleOptionChange1}/>
              </div>
              <div className='flex flex-wrap max-w-sm ml-5'>
                    {selectedChooseOptions1.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 p-2.5 mb-2 mx-2">
                            <p className='max-w-xl'>{option}</p>
                            <LiaTimesSolid className='h-5 w-5 cursor-pointer' onClick={() => handleRemoveOption(option, setSelectedChooseOptions1)} />
                        </div>
                    ))}
                
              </div>
            </div>
            ))

            }
          </div>

          <div className="flex mb-4 space-x-10">
            <div id="option2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tùy chọn 2 </label>
              <DropdownOption name='Tùy chọn sản phẩm' optionNames={options} onSelectOption={handleSelectOption2} on={isVisibleOption2}/>
            </div>
            {(isLoading2 ? (
              <Loading></Loading>
            ) : (
            <div id="choose-option2" className={`space-y-5 mt-7 ${isVisibleOption2 ? '' : 'hidden'}`}>
              <div className='flex items-center space-x-2 '>
                <LiaTimesSolid className='h-5 w-5 cursor-pointer' onClick={() => handleIconClick('category2')}/>
                <DropdownChooseOption name='Chọn' optionNames={chooseOptions2} handleOptionChange={handleOptionChange2}/>
              </div>
              <div className='flex flex-wrap max-w-sm ml-5'>
                    {selectedChooseOptions2.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 p-2.5 mb-2 mx-2">
                            <p className='max-w-xl'>{option}</p>
                            <LiaTimesSolid className='h-5 w-5 cursor-pointer' onClick={() => handleRemoveOption(option, setSelectedChooseOptions2)} />
                        </div>
                    ))}
                
              </div>
            </div>
              ))

            }
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả sản phẩm</label>
            <textarea rows={4} id="Description" className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " name="description" value={formDatas.description} onChange={handleChange} required/>
          </div>
          
          <div className='flex justify-center space-x-10 sm:space-x-40 '>
            <button type="button" className="border border-orange-500 hover:bg-orange-200  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center  dark:focus:ring-orange-800">Hủy</button>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Thêm</button>
            
          </div>
          
        </form>

      </div>
    </div>


  );
});

export default CreateProducts;
