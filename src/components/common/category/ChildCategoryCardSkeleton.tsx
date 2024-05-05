import TextSkeleton from '@components/common/skeleton/Text';

const ChildCategoryCardSkeleton = () => {
  return (
    <div className="inline-flex flex-col items-center space-y-2">
      <TextSkeleton className="h-[150px] w-[150px] rounded-full" />
      <TextSkeleton className="w-[120px] h-[14px] rounded-full" />
    </div>
  );
};

export default ChildCategoryCardSkeleton;
