

const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 animate-pulse">
      <div className="bg-gray-300 w-[150px] h-[150px] rounded-[10px]" />
      <div className="h-3 bg-gray-200 rounded-full w-32"></div>
    </div>
  );
};

interface CategoryCardSkeletonListProps {
  numberOfElement: number;
}

export const CategoryCardSkeletonList = (
  props: CategoryCardSkeletonListProps
) => {
  // const MAX = 6;
  const list = [];
  for (let i = 0; i < props.numberOfElement; i++) {
    list.push(<CategoryCardSkeleton />);
  }
  return (
    <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 items-center justify-evenly text-base space-x-2 my-8 ">
      {list.map((item, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default CategoryCardSkeleton;
