import { memo, FC } from "react";

interface ErrorMessageProps {
  msg: string;
}

const ErrorMessage: FC<ErrorMessageProps> = memo(({ msg }) => {
  return <div className="py-4 font-bold text-red-600">{msg}</div>;
});

export default ErrorMessage;
