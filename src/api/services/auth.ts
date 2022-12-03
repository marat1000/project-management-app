import { $api } from 'api';
import axios from 'axios';
import i18next from 'i18next';

interface TAuthResponse {
  name: string;
  login: string;
  _id: string;
}
interface TLoginResponse {
  token: string;
}

export class AuthService {
  static async signUp(
    name: string,
    login: string,
    password: string,
    message: { thisLoginAlreadyExists: string; unknownError: string }
  ) {
    try {
      const response = await $api.post<TAuthResponse>('/auth/signup', { name, login, password });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        throw new Error(status === 409 ? message.thisLoginAlreadyExists : message.unknownError);
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
        throw new Error(
          status === 401
            ? (i18next.t(`loginPasswordError`) as string)
            : (i18next.t(`unknownError`) as string)
        );
      } else {
        throw error;
      }
    }
  }

  static async checkAuth(message: string) {
    try {
      const response = await $api.get('/boards');
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(message);
      } else {
        throw error;
      }
    }
  }
}
