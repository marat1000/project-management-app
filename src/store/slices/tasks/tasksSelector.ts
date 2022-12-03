import { createSelector, EntityId } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { tasksAdapter } from './tasksSlice';

export const tasksAdapterSelectors = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const selectAllTasks = tasksAdapterSelectors.selectAll;
const tasksIdsByColumnIdSelector = createSelector(
  [selectAllTasks, (state: RootState, columnId: EntityId) => columnId],
  (tasks, columnId) => {
    return tasks.filter((task) => task.columnId === columnId).map((task) => task._id as EntityId);
  }
);

export const selectTaskIdsByColumnId = (columnId: EntityId) => (state: RootState) =>
  tasksIdsByColumnIdSelector(state, columnId);

export const selectTaskById = (taskId: EntityId) => (state: RootState) =>
  tasksAdapterSelectors.selectById(state, taskId);
