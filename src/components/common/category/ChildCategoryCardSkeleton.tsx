import TextSkeleton from '@components/common/skeleton/Text';

const ChildCategoryCardSkeleton = () => {
  return (
    <div className="inline-flex flex-col items-center space-y-2">
      <TextSkeleton className="h-[150px] w-[150px] rounded-full" />
      <TextSkeleton className="w-[120px] h-[14px] rounded-full" />
    </div>
  );
};

interface ChildCategoryCardSkeletonProps {
  className?: string;
  numberOfElement: number;
}

export const ChildCategoryCardSkeletonList = (
  props: ChildCategoryCardSkeletonProps
) => {
  let style =
    'flex flex-col flex-wrap justify-center items-center mt-6  md:space-y-0 md:flex-row md:space-x-12';
  if (props.className) {
    style = props.className;
  }
  // const MAX = 6;
  const list = [];
  for (let i = 0; i < props.numberOfElement; i++) {
    list.push(<ChildCategoryCardSkeleton />);
  }
  return (
    <ul className={style}>
      {list.map((item, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default ChildCategoryCardSkeleton;
