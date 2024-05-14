import { FC, memo } from 'react';
import Comment from './Comment';
import Spinner from '@components/common/ui/Spinner';

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
              date={item.data.createdAt}
              replies={item.replies}
              numberOfDownVotes={item.data.numberOfDownvotes}
              numberOfUpvotes={item.data.numberOfUpvotes}
            />
          </li>
        ))}
      </ul>
    );
  }
);

export default CommentList;
