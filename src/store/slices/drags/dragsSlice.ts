import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ColumnService from 'api/services/columns';
import { RootState } from 'store';
import { IColumn } from 'ts/interfaces';
import { columnSelectors, setColumnsOrder } from '../columns/columnsSlice';

interface IDragState {
  isLoading: boolean;
  dragColumn: IColumn | null;
  overColumn: IColumn | null;
}

const initialState: IDragState = {
  isLoading: false,
  dragColumn: null,
  overColumn: null,
};

export const dragsSlice = createSlice({
  name: 'drags',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setDragColumn: (state, action: PayloadAction<IColumn>) => {
      state.dragColumn = action.payload;
    },

    setOverColumn: (state, action: PayloadAction<IColumn>) => {
      state.overColumn = action.payload;
    },
  },
});

export default dragsSlice.reducer;

export const { setDragColumn, setOverColumn, setLoading } = dragsSlice.actions;

export const catchColumnsDrop = createAsyncThunk<void, void, { state: RootState }>(
  'drags/catchColumnsDrop',
  async (_, { getState, dispatch }) => {
    const state = getState();
    if (state.drags.isLoading) {
      return;
    }

    const before = columnSelectors
      .selectAll(state)
      .map((column) => ({ _id: column._id, order: column.order }));

    const { dragColumn, overColumn } = getState().drags;

    if (!dragColumn || !overColumn) {
      return;
    }

    const updated = before.map((column) => ({ ...column }));

    const columnOnDragIndex = updated.findIndex((item) => item._id === dragColumn._id);
    const columnOnDrag = updated.splice(columnOnDragIndex, 1)[0];
    const columnOnOverIndex = updated.findIndex((item) => item._id === overColumn._id);
    updated.splice(columnOnOverIndex + 1, 0, columnOnDrag);
    updated.forEach((column, i) => (column.order = i));

    dispatch(setColumnsOrder(updated));
    try {
      dispatch(setLoading(true));

      await ColumnService.updateOrder(updated);
    } catch {
      dispatch(setColumnsOrder(before));
    } finally {
      dispatch(setLoading(false));
    }
    // setTimeout(() => {
    //   console.log('revert');
    //   dispatch(setColumnsOrder(before));
    //   dispatch(setLoading(false));
    // }, 2000);
  }
);
