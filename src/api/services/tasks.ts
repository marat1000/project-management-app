import { EntityId } from '@reduxjs/toolkit';
import { $api } from 'api';
import { ITask } from 'ts/interfaces';

export interface IAddingTaskDataApi {
  title: string;
  order: number;
  description: string;
  users: EntityId[];
}

export default class TasksService {
  static async getAllBoardTasks(boardId: string) {
    const tasks = await $api.get<ITask[]>(`tasksSet/${boardId}`);
    return tasks.data;
  }

  static async addTask(
    boardId: EntityId,
    columnId: EntityId,
    userId: string,
    taskData: IAddingTaskDataApi
  ) {
    const body = {
      ...taskData,
      userId,
    };

    const url = `boards/${boardId}/columns/${columnId}/tasks`;

    const added = await $api.put<ITask>(url, body);
    return added.data;
  }
}
