import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { addColumn, updateColumn } from '../columns/columnsSlice';
import { toggleEditColumnModal } from '../modals/modalsSlice';

export const endEditingColumn = createAsyncThunk<boolean, void, { state: RootState }>(
  'editColumn/endEditingColumn',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { columnId, title, boardId } = state.editColumn.data;
    if (columnId && boardId) {
      const updatedColumn = {
        title,
        boardId,
        columnId,
        order: 2,
      };
      await dispatch(updateColumn(updatedColumn)).unwrap();
      dispatch(toggleEditColumnModal(false));
      return true;
    } else if (boardId) {
      const newColumn = {
        title,
        order: 3,
      };
      await dispatch(addColumn({ boardId, column: newColumn })).unwrap();
      dispatch(toggleEditColumnModal(false));
      return true;
    } else return false;
  }
);
