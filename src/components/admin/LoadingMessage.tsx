import { memo, FC } from "react";
import { Spinner } from "flowbite-react";

const LoadingMessage: FC = memo(() => {
  return (
    <div className="py-4 flex gap-x-4 items-center">
      <Spinner size={"xl"} />
      <div>Loading data...</div>
    </div>
  );
});

export default LoadingMessage;
