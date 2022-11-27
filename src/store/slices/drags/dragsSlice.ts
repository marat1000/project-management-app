import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ColumnService from 'api/services/columns';
import { RootState } from 'store';
import { IColumn } from 'ts/interfaces';
import { columnSelectors, setColumnsOrder } from '../columns/columnsSlice';

interface IDragState {
  isLoading: boolean;
  dragColumn: IColumn | null;
  dragColumnSide: 1 | -1;
  overColumn: IColumn | null;
}

const initialState: IDragState = {
  isLoading: false,
  dragColumn: null,
  dragColumnSide: -1,
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

    setOverColumn: (state, action: PayloadAction<{ column: IColumn; side: 1 | -1 }>) => {
      state.overColumn = action.payload.column;
      state.dragColumnSide = action.payload.side;
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
    const side = state.drags.dragColumnSide > 0 ? 1 : 0;

    const columnOnDragIndex = updated.findIndex((item) => item._id === dragColumn._id);
    const columnOnDrag = updated.splice(columnOnDragIndex, 1)[0];
    const columnOnOverIndex = updated.findIndex((item) => item._id === overColumn._id);

    updated.splice(columnOnOverIndex + side, 0, columnOnDrag);
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
  }
);
