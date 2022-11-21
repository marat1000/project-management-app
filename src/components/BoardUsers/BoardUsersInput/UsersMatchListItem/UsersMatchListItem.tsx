import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { addUserOnSelectedBoard } from 'store/slices/boardUsersSlice';

interface IUsersMatchListItemProps {
  id: EntityId;
  name: string;
}
export const UsersMatchListItem = memo<IUsersMatchListItemProps>(({ id, name }) => {
  const dispatch = useAppDispatch();

  const addUser = () => {
    dispatch(addUserOnSelectedBoard(id));
  };

  return (
    <div className="board-users__match-item" onClick={addUser}>
      <span> {name} </span>
      <span>+</span>
    </div>
  );
});
