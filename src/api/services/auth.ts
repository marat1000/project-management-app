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
        throw new Error(status === 409 ? 'Login is already exist' : 'Unknown error');
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
        throw new Error(status === 401 ? 'Incorrect login or password' : 'Unknown error');
      } else {
        throw error;
      }
    }
  }

  static async checkAuth() {
    try {
      const response = await $api.get('/boards');
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Unauthorized');
      } else {
        throw error;
      }
    }
  }
}
