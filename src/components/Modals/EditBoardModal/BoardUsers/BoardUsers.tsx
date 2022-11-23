import React, { memo } from 'react';
import { BoardUsersInput } from './BoardUsersInput/BoardUsersInput';
import { BoardUserList } from './BoardUsersList/BoardUsersList';

export const BoardUsers = memo(() => {
  return (
    <div className="board-users__container">
      <BoardUsersInput />
      <BoardUserList />
    </div>
  );
});
