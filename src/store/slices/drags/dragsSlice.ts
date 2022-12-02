import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ColumnService from 'api/services/columns';
import { RootState } from 'store';
import { IColumn, ITask } from 'ts/interfaces';
import { columnSelectors, setColumnsOrder } from '../columns/columnsSlice';

interface IDragState {
  isLoading: boolean;
  dragColumn: IColumn | null;
  overColumnSide: 1 | -1;
  overColumn: IColumn | null;
  dragTask: ITask | null;
}

const initialState: IDragState = {
  isLoading: false,
  dragColumn: null,
  overColumn: null,
  overColumnSide: -1,
  dragTask: null,
};

export const dragsSlice = createSlice({
  name: 'drags',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setDragTask: (state, action: PayloadAction<ITask>) => {
      state.dragTask = action.payload;
    },

    clearDragTask: (state) => {
      state.dragTask = null;
    },

    setDragColumn: (state, action: PayloadAction<IColumn>) => {
      state.dragColumn = action.payload;
    },

    setOverColumn: (state, action: PayloadAction<IColumn>) => {
      state.overColumn = action.payload;
    },

    setOverColumnSide: (state, action: PayloadAction<-1 | 1>) => {
      state.overColumnSide = action.payload;
    },
  },
});

export default dragsSlice.reducer;

export const selectIsTaskDrag = (state: RootState) => !!state.drags.dragTask;

export const {
  setDragColumn,
  setOverColumn,
  setLoading,
  setDragTask,
  clearDragTask,
  setOverColumnSide,
} = dragsSlice.actions;

export const catchColumnsDrop = createAsyncThunk<void, void, { state: RootState }>(
  'drags/catchColumnsDrop',
  async (_, { getState, dispatch }) => {
    const state = getState();
    if (state.drags.isLoading || state.drags.dragTask) {
      return;
    }

    const before = columnSelectors
      .selectAll(state)
      .map((column) => ({ _id: column._id, order: column.order }));

    const { dragColumn, overColumn } = getState().drags;

    if (!dragColumn || !overColumn) {
      return;
    }

    if (dragColumn === overColumn) {
      return;
    }

    const updated = before.map((column) => ({ ...column }));
    const side = state.drags.overColumnSide > 0 ? 1 : 0;

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

export const catchTaskDrop = createAsyncThunk<void, void, { state: RootState }>(
  'drags/catchTaskDrop',
  async (_, { getState, dispatch }) => {
    console.log('catchTaskDrop');
    dispatch(clearDragTask());
    // const state = getState();
    // if (state.drags.isLoading || state.drags.dragTask) {
    //   return;
    // }
    // const before = columnSelectors
    //   .selectAll(state)
    //   .map((column) => ({ _id: column._id, order: column.order }));
    // const { dragColumn, overColumn } = getState().drags;
    // if (!dragColumn || !overColumn) {
    //   return;
    // }
    // if (dragColumn === overColumn) {
    //   return;
    // }
    // const updated = before.map((column) => ({ ...column }));
    // const side = state.drags.dragColumnSide > 0 ? 1 : 0;
    // const columnOnDragIndex = updated.findIndex((item) => item._id === dragColumn._id);
    // const columnOnDrag = updated.splice(columnOnDragIndex, 1)[0];
    // const columnOnOverIndex = updated.findIndex((item) => item._id === overColumn._id);
    // updated.splice(columnOnOverIndex + side, 0, columnOnDrag);
    // updated.forEach((column, i) => (column.order = i));
    // dispatch(setColumnsOrder(updated));
    // try {
    //   dispatch(setLoading(true));
    //   await ColumnService.updateOrder(updated);
    // } catch {
    //   dispatch(setColumnsOrder(before));
    // } finally {
    //   dispatch(setLoading(false));
    // }
  }
);
