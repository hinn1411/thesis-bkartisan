import { memo, FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
export interface usePaginationProps {
  fetchLogicHandler: any;
}

export const usePagination: FC<usePaginationProps> = memo(
  ({ fetchLogicHandler }) => {
    return <></>;
  }
);
