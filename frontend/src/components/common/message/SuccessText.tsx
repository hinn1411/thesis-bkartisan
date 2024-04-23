import { FC, ReactNode, memo } from 'react';

export interface SuccessTextProps {
  children: ReactNode;
}

const SuccessText: FC<SuccessTextProps> = memo(({ children }) => {
  return <p className="text-green-600 text-sm">{children}</p>;
});

export default SuccessText;
