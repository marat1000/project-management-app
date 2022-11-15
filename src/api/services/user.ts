import { $api } from 'api';
import axios from 'axios';
import { IUser } from 'ts/interfaces';

export class UserService {
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
}
