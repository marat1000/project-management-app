import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectEditedBoardUsers } from 'store/slices/editBoard/editBoardSelectors';
import { BoardUserItem } from './BoardUserItem/BoardUserItem';

export const BoardUserList = memo(() => {
  const usersOnThisBoard = useAppSelector(selectEditedBoardUsers);

  return (
    <div className="board-users__list">
      {usersOnThisBoard.map((id) => (
        <BoardUserItem id={id} key={id} />
      ))}
    </div>
  );
});
