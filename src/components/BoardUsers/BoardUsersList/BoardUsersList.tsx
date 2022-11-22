import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectBoardUsers } from 'store/slices/editBoardSlice';
import { BoardUserItem } from './BoardUserItem/BoardUserItem';

export const BoardUserList = memo(() => {
  const usersOnThisBoard = useAppSelector(selectBoardUsers);

  return (
    <div className="board-users__list">
      {usersOnThisBoard.map((id) => (
        <BoardUserItem id={id} key={id} />
      ))}
    </div>
  );
});
