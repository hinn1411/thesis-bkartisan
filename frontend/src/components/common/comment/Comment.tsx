import { FC, memo } from 'react';
import { Rating } from 'flowbite-react';
import {
    LikeOutlined,
    DislikeOutlined
  } from '@ant-design/icons';

interface CommentProps {
    star: number;
    content: string;
    userName: string;
    userImage: string;
    date: string;
  }

const Comment: FC<CommentProps> = memo(
    ({ star, content, userImage, userName, date }) => {
        const stars = Array.from({ length: 5 }, (_, index) => (
            <Rating.Star key={index} filled={index < star} />
          ));
      return (
        <div className="comment">
              <div className='max-w border-b border-gray-300 pb-3'>
                <Rating className='mt-2 mb-1'>
                    {stars}
                </Rating>
                <p className=''>{content}</p>
                <div className='flex items-center'>
                  <img className='rounded-full h-10 w-10 border border-orange-600' src={userImage} alt="" />
                  <p className='text-xs p-2'>{userName}</p>
                  <p className='text-xs p-2 text-gray-400'>{date}</p>
                  <LikeOutlined
                    size={24}
                    className="hover:scale-110 duration-300 hover:cursor-pointer mr-2"
                  />
                  <DislikeOutlined
                    size={24}
                    className="hover:scale-110 duration-300 hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
      );
    }
  );
  
  export default Comment;