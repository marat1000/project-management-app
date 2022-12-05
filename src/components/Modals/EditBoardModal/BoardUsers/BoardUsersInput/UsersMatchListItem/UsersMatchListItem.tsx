import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { addEditedBoardUser } from 'store/slices/editBoard/editBoardSlice';

interface IUsersMatchListItemProps {
  id: EntityId;
  name: string;
  clearInput: () => void;
}
export const UsersMatchListItem = memo<IUsersMatchListItemProps>(({ id, name, clearInput }) => {
  const dispatch = useAppDispatch();

  const addUser = () => {
    clearInput();
    dispatch(addEditedBoardUser(id));
  };

  return (
    <div className="board-users__match-item" onClick={addUser}>
      <span> {name} </span>
      <span>+</span>
    </div>
  );
});
