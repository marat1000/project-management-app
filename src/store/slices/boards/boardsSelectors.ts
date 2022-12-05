import { EntityId } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { boardsAdapter } from './boardsSlice';

export const boardsSelectors = boardsAdapter.getSelectors<RootState>((state) => state.boards);

export const selectBoardsIds = boardsSelectors.selectIds;
export const selectBoardById = (id: EntityId | null) => (state: RootState) => {
  if (!id) return null;
  return boardsSelectors.selectById(state, id);
};
