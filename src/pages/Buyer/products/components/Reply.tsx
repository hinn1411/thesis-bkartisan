import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { FC, memo, useState } from 'react';
import ReportCommentModal from './ReportCommentModal';

export interface ReplyProps {
  commentId: number;
  content: string;
  createdAt: string;
  writer: string;
  parentId: number;
  numberOfUpvotes: number;
  numberOfDownvotes: number;
  avatar: string;
}

const Reply: FC<ReplyProps> = memo(
  ({
    content,
    createdAt,
    writer,
    avatar,
    numberOfDownvotes,
    numberOfUpvotes,
  }) => {
    const [isToggleReportModal, setIsToggleReportModal] = useState(false);
    return (
      <section className="border-b space-y-1 border-gray-300 pb-3 mb-3">
        {/* Content */}
        <ReportCommentModal
          isOpen={isToggleReportModal}
          setIsOpen={setIsToggleReportModal}
        />
        <p className="text-sm">{content}</p>
        {/* Buttons container */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Writer Information */}
            <figure className="flex items-center space-x-1">
              <img
                className="object-cover rounded-full h-8 w-8 border border-orange-600"
                src={avatar}
                alt="writer image"
              />
              <figcaption className="text-xs font-medium">{writer}</figcaption>
            </figure>
            {/* Time */}
            <p className="text-gray-500 text-xs ">{createdAt}</p>
            <div className="flex items-center space-x-2 font-medium">
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
                <span className="text-xs">({numberOfDownvotes})</span>
              </div>
            </div>
          </div>
          <div
            onClick={() => setIsToggleReportModal((prev) => !prev)}
            className="cursor-pointer"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
          </div>
        </div>
      </section>
    );
  }
);

export default Reply;
