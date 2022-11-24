import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUserById } from 'store/slices/editBoard/editBoardSelectors';
import { removeEditedBoardUser } from 'store/slices/editBoard/editBoardSlice';
interface IBoardUsersProps {
  id: EntityId;
}
export const BoardUserItem = memo<IBoardUsersProps>(({ id }) => {
  const userData = useAppSelector(selectUserById(id));
  const dispatch = useAppDispatch();

  const deleteUser = () => {
    dispatch(removeEditedBoardUser(id));
  };

  return (
    <div className="board-users__item">
      <span>{userData?.name || 'DELETED'}</span>
      <button onClick={deleteUser}>✖</button>
    </div>
  );
});
