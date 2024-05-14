import { FC, memo, useState } from 'react';
import Reply from './Reply';
import Spinner from '@components/common/ui/Spinner';
import { Textarea } from 'flowbite-react';
import { useComment } from '../hooks/useComment';
import { useParams } from 'react-router-dom';
export interface ReplyListProps {
  data: Array<any>;
  isLoading?: boolean;
  className?: string;
  parentId: number;
}

const ReplyList: FC<ReplyListProps> = memo(
  ({ data, isLoading, className, parentId }) => {
    const { productId } = useParams();
    const [currentReply, setCurrentReply] = useState<string>('');
    const { addComment } = useComment();
    let style = '';
    if (className) {
      style = className;
    }
    if (isLoading) {
      return <Spinner />;
    }
    const handleAddComment = () => {
      if (!productId) {
        return;
      }
      addComment({
        productId: +productId,
        parentId: parentId,
        content: currentReply,
        numberOfStars: null,
      });
      setCurrentReply('');
    };
    return (
      <section className={`${style}`}>
        <div className="max-w flex flex-col">
          <Textarea
            className="resize-none"
            id="comment"
            placeholder="Nhập bình luận"
            rows={2}
            value={currentReply}
            onChange={(e) => setCurrentReply(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            type="button"
            className="bg-green-500 mt-3 w-1/6 p-1 rounded-md text-white self-end"
          >
            Gửi
          </button>
        </div>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <Reply {...item} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

export default ReplyList;
