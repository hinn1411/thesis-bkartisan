interface CategoryCardSkeletonProps {
  className?: string;
}

const CategoryCardSkeleton = (props: CategoryCardSkeletonProps) => {
  let style =
    'flex flex-col justify-center items-center space-y-2 animate-pulse';
  if(props.className) {
    style = props.className;
  }
  return (
    <div className={style}>
      <div className="bg-gray-300 w-[150px] h-[150px] rounded-[10px]" />
      <div className="h-3 bg-gray-200 rounded-full w-32"></div>
    </div>
  );
};

interface CategoryCardSkeletonListProps {
  className?: string;
  numberOfElement: number;
}

export const CategoryCardSkeletonList = (
  props: CategoryCardSkeletonListProps
) => {
  let style =
    'flex flex-col flex-wrap justify-center items-center mt-6 my-2  md:space-y-0 md:flex-row md:space-x-12';
  if (props.className) {
    style = props.className;
  }
  // const MAX = 6;
  const list = [];
  for (let i = 0; i < props.numberOfElement; i++) {
    list.push(<CategoryCardSkeleton  />);
  }
  return (
    <ul className={style}>
      {list.map((item, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default CategoryCardSkeleton;
