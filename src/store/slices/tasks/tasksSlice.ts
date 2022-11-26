import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ITask } from 'ts/interfaces';
import { addTask, deleteTask, editTask, fetchAllTasksOnBoard } from './tasksThunks';

export const tasksAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task._id,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState({
    fetching: {
      isLoading: false,
      error: '',
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasksOnBoard.pending, (state) => {
        state.fetching.isLoading = true;
        state.fetching.error = '';
      })
      .addCase(fetchAllTasksOnBoard.fulfilled, (state, action) => {
        tasksAdapter.setAll(state, action.payload);
        state.fetching.isLoading = false;
      })
      .addCase(fetchAllTasksOnBoard.rejected, (state, action) => {
        state.fetching.isLoading = false;
        state.fetching.error = action.error.message || 'Unknown error';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const task = action.payload;
        tasksAdapter.updateOne(state, { id: task._id, changes: { ...task } });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const task = action.payload;
        tasksAdapter.removeOne(state, task._id);
      });
  },
});

export default tasksSlice.reducer;
