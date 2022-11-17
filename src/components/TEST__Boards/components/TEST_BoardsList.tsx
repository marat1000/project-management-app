import React from 'react';
import { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectBoardsIds } from 'store/slices/boardsSlice';
import { TEST__BoardItem } from './TEST__BoardItem';

export const TEST__BoardsList = memo(() => {
  const ids = useAppSelector(selectBoardsIds);

  return (
    <div>
      {ids.map((id) => (
        <TEST__BoardItem key={id} id={id} />
      ))}
    </div>
  );
});
