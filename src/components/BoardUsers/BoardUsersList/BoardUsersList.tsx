import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectUsersIdsOnSelectedBoard } from 'store/slices/boardUsersSlice';
import { BoardUserItem } from './BoardUserItem/BoardUserItem';

export const BoardUserList = memo(() => {
  const usersOnThisBoard = useAppSelector(selectUsersIdsOnSelectedBoard);

  return (
    <div>
      {usersOnThisBoard.map((id) => (
        <BoardUserItem id={id} key={id} />
      ))}
    </div>
  );
});
