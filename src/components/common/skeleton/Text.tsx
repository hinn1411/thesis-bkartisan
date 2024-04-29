import { FC } from 'react';

export interface TextSkeletonProps {
  className?: string;
}
const TextSkeleton: FC<TextSkeletonProps> = ({ className }) => {
  let style = 'h-2.5 w-24';
  if (className) {
    style = className;
  }
  return (
    <div className={`${style} bg-gray-300 rounded-full animate-pulse`}></div>
  );
};

export const TextListSkeleton = (props) => {
  const list = [];
  for (let i = 0; i < props.numberOfElement; i++) {
    list.push(<TextSkeleton className="h-4 w-32" />);
  }
  return (
    <ul className="hidden md:flex justify-between items-center mt-4 text-[13px] md:space-x-4 mx-auto">
      {list.map((item, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default TextSkeleton;
