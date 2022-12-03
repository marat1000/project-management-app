import { EntityId } from '@reduxjs/toolkit';
import { $api } from 'api';
import { TTaskOrderUpdate } from 'store/slices/drags/dragsSlice';
import { ITask } from 'ts/interfaces';

export interface ITaskDataBodyApi {
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
    taskData: ITaskDataBodyApi
  ) {
    const body = {
      ...taskData,
      userId,
      description: taskData.description || '',
    };

    const url = `boards/${boardId}/columns/${columnId}/tasks`;

    const added = await $api.post<ITask>(url, body);
    return added.data;
  }

  static async editTask(
    boardId: EntityId,
    columnId: EntityId,
    taskId: EntityId,
    userId: string,
    taskData: ITaskDataBodyApi
  ) {
    const body = {
      ...taskData,
      userId,
      columnId,
      description: taskData.description || '',
    };

    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;

    const added = await $api.put<ITask>(url, body);
    return added.data;
  }

  static loadTasks = async (userId: string, tasksIds: string[]) => {
    const response = await $api.get<ITask[]>(`tasksSet?userId=${userId}&ids=[${tasksIds}]`);
    return response.data;
  };

  static async deleteTask(boardId: EntityId, columnId: EntityId, taskId: EntityId) {
    const url = `boards/${boardId}/columns/${columnId}/tasks/${taskId}`;

    const added = await $api.delete<ITask>(url);
    return added.data;
  }

  static updateOrder = async (orders: TTaskOrderUpdate[]) => {
    const response = await $api.patch<ITask[]>(`tasksSet`, orders);
    return response.data;
  };
}
