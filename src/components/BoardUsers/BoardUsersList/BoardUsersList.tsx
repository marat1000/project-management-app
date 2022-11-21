import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectUsersIdsOnSelectedBoard } from 'store/slices/boardUsersSlice';
import { BoardUserItem } from './BoardUserItem/BoardUserItem';

export const BoardUserList = memo(() => {
  const usersOnThisBoard = useAppSelector(selectUsersIdsOnSelectedBoard);

  return (
    <div className="board-users__list">
      {usersOnThisBoard.map((id) => (
        <BoardUserItem id={id} key={id} />
      ))}
    </div>
  );
});
