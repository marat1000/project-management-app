import { $api } from 'api';
import axios from 'axios';

interface TAuthResponse {
  name: string;
  login: string;
  _id: string;
}
interface TLoginResponse {
  token: string;
}

export class AuthService {
  static async signUp(name: string, login: string, password: string) {
    try {
      const response = await $api.post<TAuthResponse>('/auth/signup', { name, login, password });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        throw new Error(status === 409 ? 'loginAlreadyExists' : 'unknownError');
      } else {
        throw error;
      }
    }
  }
  static async signIn(login: string, password: string) {
    try {
      const response = await $api.post<TLoginResponse>('/auth/signin', { login, password });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        throw new Error(status === 401 ? 'loginPasswordError' : 'unknownError');
      } else {
        throw error;
      }
    }
  }

  static async checkAuth() {
    const response = await $api.get('/boards');
    return response;
  }
}
