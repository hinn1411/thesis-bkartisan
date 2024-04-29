import {memo, FC} from "react";

const HorizontalDivider: FC = memo(() => {
  return <div className="border border-r-black my-3"></div>;
});

export default HorizontalDivider;