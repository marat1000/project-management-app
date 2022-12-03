import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'api/services/auth';
import jwtDecode from 'jwt-decode';
import { ELSKeys } from 'ts/enums';

type TRegisterProps = {
  name: string;
  login: string;
  password: string;
};

type TLoginProps = {
  login: string;
  password: string;
};

type TDecodedJWT = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

export const signIn = createAsyncThunk('auth/login', async ({ login, password }: TLoginProps) => {
  const response = await AuthService.signIn(login, password);
  if (response) {
    const { token } = response.data;
    localStorage.setItem(ELSKeys.token, token);
    const { id, login } = jwtDecode<TDecodedJWT>(token);
    return { id, login };
  }

  return response;
});

export const signUp = createAsyncThunk(
  'auth/registration',
  async ({ name, login, password }: TRegisterProps, thunkAPI) => {
    const response = await AuthService.signUp(name, login, password);
    if (response.status === 200) {
      return thunkAPI.dispatch(signIn({ login, password }));
    }
  }
);

export const checkAuth = createAsyncThunk('auth/check', async (message: string) => {
  // just try to fetch some data;
  // token will be will be taken from LS and placed to headers
  // if response will ok it means token works
  // if not user have to auth

  // if no saved token
  if (!localStorage.getItem(ELSKeys.token)) {
    throw new Error();
  }
  // if is check token
  const response = await AuthService.checkAuth(message);
  if (response) {
    const token = localStorage.getItem(ELSKeys.token)!;
    return jwtDecode<TDecodedJWT>(token);
  }
  return response;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem(ELSKeys.token);
});
