import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ColumnService from 'api/services/columns';
import TasksService from 'api/services/tasks';
import { RootState } from 'store';
import { IColumn, ITask } from 'ts/interfaces';
import { columnSelectors, setColumnsOrder } from '../columns/columnsSlice';
import { tasksAdapterSelectors } from '../tasks/tasksSelector';
import { setTasksOrder } from '../tasks/tasksSlice';

interface IDragState {
  isLoading: boolean;
  dragColumn: IColumn | null;
  overColumnSide: 1 | -1;
  overColumn: IColumn | null;
  dragTask: ITask | null;
  overTask: ITask | null;
  overTaskSide: 1 | -1;
}

const initialState: IDragState = {
  isLoading: false,
  dragColumn: null,
  overColumn: null,
  overColumnSide: -1,
  dragTask: null,
  overTask: null,
  overTaskSide: 1,
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

    setOverTask: (state, action: PayloadAction<ITask | null>) => {
      state.overTask = action.payload;
    },

    setOverTaskSide: (state, action: PayloadAction<-1 | 1>) => {
      state.overTaskSide = action.payload;
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
  setOverTask,
  setOverTaskSide,
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
    const state = getState();
    if (state.drags.isLoading) {
      return;
    }
    const { overTask, overColumn, dragTask } = state.drags;

    if (!dragTask || !overColumn) {
      return;
    }

    const tasksOnColumnBefore = tasksAdapterSelectors
      .selectAll(state)
      .filter((task) => task.columnId === overColumn._id)
      .map((task) => ({ _id: task._id, order: task.order, columnId: task.columnId }));

    if (!overTask) {
      // place to end of tasks list on column
      const before = {
        _id: dragTask._id,
        order: dragTask.order,
        columnId: dragTask.columnId,
      };

      const lastTaskInColumn = tasksOnColumnBefore.at(-1);

      const updated = {
        ...before,
        columnId: overColumn._id,
        order: lastTaskInColumn
          ? lastTaskInColumn._id === before._id
            ? before.order
            : lastTaskInColumn.order + 1
          : 0,
      };
      dispatch(setTasksOrder([updated]));
      try {
        dispatch(setLoading(true));
        dispatch(clearDragTask());
        await TasksService.updateOrder([updated]);
      } catch {
        dispatch(setTasksOrder([before]));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      const side = state.drags.overTaskSide > 0 ? 1 : 0;

      const beforeTask = {
        _id: dragTask._id,
        order: dragTask.order,
        columnId: dragTask.columnId,
      };

      const updatedList = tasksOnColumnBefore.map((task) => ({ ...task }));

      if (overTask.columnId === dragTask.columnId) {
        //if in the same column
        const taskOnDragIndex = updatedList.findIndex((item) => item._id === dragTask._id);
        const taskOnDrag = updatedList.splice(taskOnDragIndex, 1)[0];
        const taskOnOverIndex = updatedList.findIndex((item) => item._id === overTask._id);
        updatedList.splice(taskOnOverIndex + side, 0, taskOnDrag);
        updatedList.forEach((task, i) => (task.order = i));
        dispatch(setTasksOrder(updatedList));
        try {
          dispatch(setLoading(true));
          dispatch(clearDragTask());
          await TasksService.updateOrder(updatedList);
        } catch {
          dispatch(setTasksOrder([...tasksOnColumnBefore, beforeTask]));
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        //if in different columns
        const taskOnOverIndex = updatedList.findIndex((item) => item._id === overTask._id);
        const updatedTask = {
          ...beforeTask,
          columnId: overTask.columnId,
        };

        updatedList.splice(taskOnOverIndex + side, 0, updatedTask);
        updatedList.forEach((task, i) => {
          task.order = i;
        });
        dispatch(setTasksOrder(updatedList));
        try {
          dispatch(setLoading(true));
          dispatch(clearDragTask());
          await TasksService.updateOrder(updatedList);
        } catch {
          dispatch(setTasksOrder([...tasksOnColumnBefore, beforeTask]));
        } finally {
          dispatch(setLoading(false));
        }
      }
    }
  }
);
