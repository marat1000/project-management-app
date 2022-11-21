import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeUserOnSelectedBoard, selectUserById } from 'store/slices/boardUsersSlice';
interface IBoardUsersProps {
  id: EntityId;
}
export const BoardUserItem = memo<IBoardUsersProps>(({ id }) => {
  const userData = useAppSelector(selectUserById(id));
  const dispatch = useAppDispatch();

  const deleteUser = () => {
    dispatch(removeUserOnSelectedBoard(id));
  };
  return (
    <div className="board-users__item">
      <span>{userData?.name}</span>
      <button onClick={deleteUser}>✖</button>
    </div>
  );
});
