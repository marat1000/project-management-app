import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectBoardById } from 'store/slices/boardsSlice';

interface ITEST__BoardItemProps {
  id: EntityId;
}

export const TEST__BoardItem = memo<ITEST__BoardItemProps>(({ id }) => {
  const data = useAppSelector(selectBoardById(id));
  return (
    <div>
      <h2>{data?.title}</h2>
    </div>
  );
});
