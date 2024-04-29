import { FC, memo } from 'react';
import { Carousel } from 'flowbite-react';
import { Rating } from 'flowbite-react';
import {Textarea } from 'flowbite-react';

import Pagination from '../../../components/common/pagination/Pagination';
import Comment from '../../../components/common/comment/Comment';
import CategoryLink from '../../../components/common/categotylink/CategoryLink';
import {
  HeartOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useState } from 'react';


const ProductDetail: FC = memo(() => {
  const starShop : number = 2;
  const starProduct : number = 2;
  const starsProduct = Array.from({ length: 5 }, (_, index) => (
    <Rating.Star key={index} filled={index < starProduct} />
  ));
  const starsShop = Array.from({ length: 5 }, (_, index) => (
    <Rating.Star key={index} filled={index < starShop} />
  ));

  const [expandedStates, setExpandedStates] = useState([false, false, false, false]);

  const handleButtonClick = (index: number) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  return (
    <div className='mx-20'>
      <div className='flex items-center space-x-2 md:space-x-5 text-xs p-4 '>
        <CategoryLink linkTo='/' categoryName='Trang chủ'></CategoryLink>
        <CategoryLink linkTo='' categoryName='Đồ chơi & Giải trí'></CategoryLink>
        <CategoryLink linkTo='' categoryName='Trò chơi & Câu đố'></CategoryLink>
        <CategoryLink linkTo='' categoryName='Board game'></CategoryLink>
        <CategoryLink linkTo='' categoryName='Cờ'></CategoryLink>
        <p>Cờ gỗ của nga</p>
      </div>
      <div className = "container mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Carousel */}
        <div className="h-auto ">
          <div className="h-48 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel indicators={false}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="..." />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="..." />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="..." />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="..." />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="..." />
              
            </Carousel>
          </div>
          <div className='flex mt-10 space-x-4 flex-wrap'>
              <img className='w-20 h-20 my-4' src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="" /> 
              <img className='w-20 h-20 my-4' src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="" />
              <img className='w-20 h-20 my-4' src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="" />
              <img className='w-20 h-20 my-4' src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg" alt="" />           
            </div>
        </div>
         {/* Information product */}
        <div className=' md:ml-10 my-2'>
          <p className='text-red-700 mb-3'>Hàng hiếm</p>
          <div className='flex items-center mb-3'>
            <p className='text-green-600 mr-1 text-xl'>1,515,152đ</p>
            <p className='text-neutral-400 line-through text-xs'>2,020,202đ</p>
          </div>
          <p className='text-green-600 mb-2'>Chương trình khuyến mãi được áp dụng đến 27/11/2023</p>
          <p>Hộp đựng bút chì bằng gỗ của Liên Xô cổ điển thập niên 80 được làm bằng gỗ theo phong cách bàn cờ. Món quà tuyệt vời cho nam giới và người sưu tập.</p>
          <div className='flex items-center text-sm space-x-2 my-1'>
            <a className='underline' href="#">sadboizaintcry</a>
            <Rating className='mt-2 mb-1'>
                  {starsShop}
            </Rating>
          </div>
          <div className='max-w-full flex my-5'>
            <button className='bg-black w-3/4 mx-auto text-white py-2 rounded-full hover:scale-110 duration-300 hover:cursor-pointer'>Thêm vào giỏ hàng</button>
          </div>
          <div className='my-3'>
            <button type='button' className='flex items-center justify-between w-full' onClick={() => handleButtonClick(0)}> 
              <p>Chi tiết sản phẩm</p>
              <DownOutlined className={`transform ${expandedStates[0] ? 'rotate-180' : ''}`}></DownOutlined>
            </button>
            <div className={`overflow-hidden transition-max-h duration-300 ${expandedStates[0] ? 'max-h-96' : 'max-h-0'}`}>
              <p className='my-3'>Chất liệu: Gỗ</p>
              <p>Lorem ipsum dolor sit amet consectetur. Sollicitudin a tellus mattis eu fringilla id vestibulum egestas diam. Pellentesque mauris malesuada viverra et nunc cras bibendum elementum diam. Congue mollis cum duis aenean senectus est viverra at.</p>
            </div>
          </div>

          <div className='my-3'>
            <button type='button' className='flex items-center justify-between w-full' onClick={() => handleButtonClick(1)}> 
              <p>Vận chuyển và chính sách đổi trả</p>
              <DownOutlined className={`transform ${expandedStates[1] ? 'rotate-180' : ''}`}></DownOutlined>
            </button>
            <div className={`overflow-hidden transition-max-h duration-300 ${expandedStates[1] ? 'max-h-96' : 'max-h-0'}`}>
              <p className='my-3'>Lorem ipsum dolor sit amet consectetur. Sollicitudin a tellus mattis eu fringilla id vestibulum egestas diam. Pellentesque mauris malesuada viverra et nunc cras bibendum elementum diam. Congue mollis cum duis aenean senectus est viverra at.</p>
            </div>
          </div>

          <div className='my-3'>
            <button type='button' className='flex items-center justify-between w-full' onClick={() => handleButtonClick(2)}> 
              <p>Câu hỏi thường gặp</p>
              <DownOutlined className={`transform ${expandedStates[2] ? 'rotate-180' : ''}`}></DownOutlined>
            </button>
            <div className={`overflow-hidden transition-max-h duration-300 ${expandedStates[2] ? 'max-h-96' : 'max-h-0'}`}>
              <p className='my-3'>Lorem ipsum dolor sit amet consectetur. Sollicitudin a tellus mattis eu fringilla id vestibulum egestas diam. Pellentesque mauris malesuada viverra et nunc cras bibendum elementum diam. Congue mollis cum duis aenean senectus est viverra at.</p>
            </div>
          </div>

          <div className='my-3'>
            <button type='button' className='flex items-center justify-between w-full' onClick={() => handleButtonClick(3)}> 
              <p>Gặp gỡ người bán</p>
              <DownOutlined className={`transform ${expandedStates[3] ? 'rotate-180' : ''}`}></DownOutlined>
            </button>
            <div className={`overflow-hidden transition-max-h duration-300 ${expandedStates[3] ? 'max-h-96' : 'max-h-0'}`}>
              <div className='my-3 flex space-x-4'>
                <div className='w-20 h-20 rounded-md'>
                  <img src="https://nguoinoitieng.tv/images/nnt/96/0/bbh0.jpg" alt="" />
                </div>
                <div>
                  <p>Tuấn Hiền</p>
                  <p className='text-xs'>Chủ sở hữu của <a className='underline text-xs' href="#">sadboizaintcry</a></p>
                  <button type='button' className='flex items-center space-x-2 text-xs '>
                    <HeartOutlined></HeartOutlined>
                    <p>Theo dõi shop</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment and rating */}
        <div>
          {/* Rating */}
          <Rating className='mt-2 mb-1'>
            <p className="border-r-2 pr-1 border-black">Đánh giá sản phẩm</p>
            {starsProduct}
            <p className="ml-1 mb-4 text-sm">(302)</p>
          </Rating>
          {/* Comment box */}
          <form className="max-w flex flex-col">
            <Textarea className='resize-none' id="comment" placeholder="Nhập bình luận" rows={4}/>
            <button type='submit' className='bg-green-500 mt-3 w-1/6 p-1 rounded-md text-white self-end'>Gửi</button>
          </form>
          {/* List comment */}
          <div id='ListComment' className=' flex flex-col items-center mb-10'>
            <Comment star={5} content='Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium.' userName='sweetcake12' userImage='https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg' date='25 Tháng 10, 2023'></Comment>
            <Comment star={5} content='Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium.' userName='sweetcake12' userImage='https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg' date='25 Tháng 10, 2023'></Comment>
            <Comment star={5} content='Lorem ipsum dolor sit amet consectetur. Odio integer pellentesque justo eget volutpat nisl cursus quis pretium.' userName='sweetcake12' userImage='https://baoduongmaynenkhi.vn/wp-content/uploads/2022/03/Bieu-cam-Noi-vay-ma-nghe-duoc-a-cua-meo-Tom.jpg' date='25 Tháng 10, 2023'></Comment>
            
            
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;