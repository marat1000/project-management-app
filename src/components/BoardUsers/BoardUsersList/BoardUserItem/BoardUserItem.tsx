import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectUserById } from 'store/slices/boardUsersSlice';
interface IBoardUsersProps {
  id: EntityId;
}
export const BoardUserItem = memo<IBoardUsersProps>(({ id }) => {
  const userData = useAppSelector(selectUserById(id));
  return <div>{userData?.name}</div>;
});
