import { EntityId } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { boardUsersAdapter } from './editBoardSlice';

const usersSelectors = boardUsersAdapter.getSelectors<RootState>((state) => state.editBoard);
export const selectUserById = (id: EntityId) => (state: RootState) =>
  usersSelectors.selectById(state, id);
export const selectAllUsers = usersSelectors.selectAll;
export const selectEditedBoardFlags = (state: RootState) => state.editBoard.flags;
export const selectEditedBoardId = (state: RootState) => state.editBoard.data.id;
export const selectEditedBoardUsers = (state: RootState) => state.editBoard.data.users;
