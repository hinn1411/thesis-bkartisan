import { FC, memo } from 'react';
import Comment from './Comment';
import Spinner from '@components/common/ui/Spinner';
import { formatDate } from '@utils/formatDate';

export interface CommentListProps {
  isLoading: boolean;
  data: any;
  className?: string;
}
const CommentList: FC<CommentListProps> = memo(
  ({ isLoading, data, className }) => {
    let style = '';
    if (className) {
      style = className;
    }
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <ul className={`${style}`}>
        {data.comments.map((item: any, index: number) => (
          <li key={index}>
            <Comment
              commentId={item.data.commentId}
              star={item.data.numberOfStars}
              content={item.data.content}
              userName={item.data.writer}
              userImage={item.data.avatar}
              date={formatDate("hh:MM dd/mm/yyyy",new Date(item.data.createdAt))}
              replies={item.replies}
              numberOfDownVotes={item.data.numberOfDownvotes}
              numberOfUpvotes={item.data.numberOfUpvotes}
              writerName={item.data.writerName}
            />
          </li>
        ))}
      </ul>
    );
  }
);

export default CommentList;
