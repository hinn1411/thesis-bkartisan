import React, { FC } from 'react';

export interface MessageProps {
  children: React.ReactNode;
}

export const Message: FC<MessageProps> = ({ children }) => {
  return <p className="ms-4 text-sm">{children}</p>;
};
