import { createAsyncThunk, EntityId } from '@reduxjs/toolkit';
import TasksService, { IAddingTaskDataApi } from 'api/services/tasks';
import { RootState } from 'store';
import { ITask } from 'ts/interfaces';

export const fetchAllTasksOnBoard = createAsyncThunk(
  'tasks/getAllTasksOnBoard',
  async (boardId: EntityId) => {
    const tasks = await TasksService.getAllBoardTasks(boardId as string);
    return tasks;
  }
);

interface IAddingTaskDataThunk {
  boardId: EntityId;
  columnId: EntityId;
  taskData: IAddingTaskDataApi;
}

export const addTask = createAsyncThunk<ITask, IAddingTaskDataThunk, { state: RootState }>(
  'tasks/addTask',
  async ({ boardId, columnId, taskData }, { getState }) => {
    const userId = getState().user.id;
    const added = await TasksService.addTask(boardId, columnId, userId, taskData);
    return added;
  }
);
