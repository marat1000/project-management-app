import { $api } from 'api';
import axios from 'axios';

import { IEditUserParams, IUser } from 'ts/interfaces';

export class UserService {
  static async getAllUsers() {
    const response = await $api.get<IUser[]>(`users`);
    return response.data;
  }

  static async getUser(id: string) {
    try {
      const response = await $api.get<IUser>(`users/${id}`);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        throw new Error(status === 404 ? 'Login undefined' : 'Unknown error');
      } else {
        throw error;
      }
    }
  }

  static async editUser(id: string, body: IEditUserParams) {
    try {
      const response = await $api.put<IUser>(`users/${id}`, body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        throw new Error(status === 409 ? 'Login already exist' : 'Bad request');
      } else {
        throw error;
      }
    }
  }

  static async deleteUser(id: string) {
    try {
      const response = await $api.delete<IUser>(`users/${id}`);
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Something gone wrong');
      } else {
        throw error;
      }
    }
  }
}
