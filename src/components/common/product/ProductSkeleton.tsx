import TextSkeleton from '@components/common/skeleton/Text';

const ProductSkeleton = () => {
  return (
    <div className=" rounded-[10px] border ">
      <div className="flex flex-col p-3 space-y-2">
        <TextSkeleton className="h-[225px]  w-full mx-auto rounded-[5px]" />
        <TextSkeleton className="w-full h-[12px] rounded-full" />
        <TextSkeleton className="w-full h-[12px] rounded-full" />
        <TextSkeleton className="w-full h-[12px] rounded-full" />
      </div>
    </div>
  );
};

interface ProductSkeletonListProps {
  className?: string;
  numberOfElement: number;
}
export const ProductSkeletonList = (props: ProductSkeletonListProps) => {
  let style =
    'flex flex-col space-y-4 md:flex-row md:space-y-0 items-center justify-evenly text-base space-x-2 my-8 ';
  if (props.className) {
    style = props.className;
  }
  // const MAX = 6;
  const list = [];
  for (let i = 0; i < props.numberOfElement; i++) {
    list.push(<ProductSkeleton />);
  }
  return (
    <ul className={`${style}`}>
      {list.map((item, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default ProductSkeleton;
