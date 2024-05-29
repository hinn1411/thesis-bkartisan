import { FC, memo, useState } from 'react';
import { Rating } from '@mui/material';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import ReplyList from './ReplyList';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import ReportCommentModal from './ReportCommentModal';
import { useUserProfile } from '@hooks/useUserProfile';

export interface CommentProps {
  commentId: number;
  star: number;
  content: string;
  userName: string;
  userImage: string;
  date: string;
  replies: any;
  numberOfUpvotes: number;
  numberOfDownVotes: number;
  writerName: number;
}

const Comment: FC<CommentProps> = memo(
  ({
    star,
    content,
    userImage,
    userName,
    date,
    numberOfUpvotes,
    numberOfDownVotes,
    replies,
    commentId,
    writerName,
  }) => {
    console.log(`star = ${star}`);

    const comment = {
      writer: userName,
      writerName,
      commentId,
    }
    const { user, isPending: isLoadingUser, isAuthenticated } = useUserProfile(); 


    const [isToggleReply, setIsToggleReply] = useState(false);
    const [isToggleReportModal, setIsToggleReportModal] = useState(false);
    return (
      <div className="comment">
        {/* Comment */}

        <ReportCommentModal
          isOpen={isToggleReportModal}
          setIsOpen={setIsToggleReportModal}
          user={user}
          comment={comment}
        />

        <div className="max-w border-b border-gray-300 pb-3">
          <Rating name="read-only" value={star} readOnly size="small" />
          <p className="">{content}</p>

          {/* Interaction container */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="object-cover rounded-full h-10 w-10 border border-orange-600"
                src={userImage}
                alt=""
              />
              <p className="text-xs p-2">{userName}</p>
              <p className="text-xs p-2 text-gray-400">{date}</p>
              {/* Interaction container */}
              <div className="flex items-center space-x-1 font-medium">
                <div className="flex items-center space-x-[1.5px]">
                  <LikeOutlined
                    size={24}
                    className="hover:scale-110 duration-300 hover:cursor-pointer"
                  />
                  <span className="text-xs">({numberOfUpvotes})</span>
                </div>
                <div className="flex items-center space-x-[1.5px]">
                  <DislikeOutlined
                    size={24}
                    className="hover:scale-110 duration-300 hover:cursor-pointer"
                  />
                  <span className="text-xs">({numberOfDownVotes})</span>
                </div>
              </div>
              {/* Reply button */}
              <p
                onClick={() => setIsToggleReply((prev) => !prev)}
                className="ms-2 text-xs font-medium cursor-pointer"
              >
                Phản hồi
              </p>
            </div>
            <div
              onClick={() => setIsToggleReportModal((prev) => !prev)}
              className="cursor-pointer"
            >
              <ExclamationTriangleIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
        {/* Replies */}
        <div className="mt-3">
          {isToggleReply && (
            <ReplyList parentId={commentId} className="ms-12" data={replies} />
          )}
        </div>
      </div>
    );
  }
);

export default Comment;
