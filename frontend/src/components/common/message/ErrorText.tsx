import { FC, ReactNode, memo } from 'react';

export interface ErrorTextProps {
  children: ReactNode;
}

const ErrorText: FC<ErrorTextProps> = memo(({ children }) => {
  return <p className="text-red-600 text-sm">{children}</p>;
});

export default ErrorText;
