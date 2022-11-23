import { AddBoardItem } from 'components/BoardItem/addBoardItem';
import { BoardsItem } from 'components/BoardItem/BoardItem';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectBoardsIds } from 'store/slices/boardsSlice';

export const BoardsList = memo(() => {
  const ids = useAppSelector(selectBoardsIds);
  return (
    <>
      <div className="main__list">
        {ids.map((id) => (
          <BoardsItem id={id} key={id}></BoardsItem>
        ))}
        <AddBoardItem />
      </div>
    </>
  );
});
