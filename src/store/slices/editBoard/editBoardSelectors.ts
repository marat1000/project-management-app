import { createSelector, EntityId } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { boardUsersAdapter } from './editBoardSlice';

const usersSelectors = boardUsersAdapter.getSelectors<RootState>((state) => state.editBoard);
export const selectUserById = (id: EntityId) => (state: RootState) =>
  usersSelectors.selectById(state, id);
export const selectAllUsers = usersSelectors.selectAll;
export const selectEditedBoardFlags = (state: RootState) => state.editBoard.flags;
export const selectEditedBoardId = (state: RootState) => state.editBoard.data.id;
export const selectEditedBoardUsers = (state: RootState) => state.editBoard.data.users;

const usersByIdsSelector = createSelector(
  [selectAllUsers, (state: RootState, ids: EntityId[]) => ids],
  (allUsers, ids) => {
    return allUsers.filter((user) => ids.includes(user._id));
  }
);

export const selectUsersByIds = (ids: EntityId[]) => (state: RootState) =>
  usersByIdsSelector(state, ids);
