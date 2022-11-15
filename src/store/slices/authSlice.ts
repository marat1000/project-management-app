import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from 'api/services/auth';
import jwtDecode from 'jwt-decode';
import { RootState } from 'store';
import { ELSKeys } from 'ts/enums';

export interface IAuthState {
  isAuth: boolean;
  isChecking: boolean;
  registration: {
    error: string;
    isLoading: boolean;
  };
  login: {
    error: string;
    isLoading: boolean;
  };
}

const initialState: IAuthState = {
  isAuth: false,
  isChecking: true,
  registration: {
    isLoading: false,
    error: '',
  },
  login: {
    isLoading: false,
    error: '',
  },
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.rejected, (state) => {
      state.isChecking = false;
    });

    builder.addCase(checkAuth.fulfilled, (state) => {
      state.isAuth = true;
      state.isChecking = false;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.isChecking = true;
    });

    builder.addCase(signIn.pending, (state) => {
      state.login.isLoading = true;
      state.login.error = '';
    });

    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuth = true;
      state.login.isLoading = false;
      state.login.error = '';
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.login.error = action.error.message || 'Unknown error';
      state.login.isLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.registration.isLoading = true;
      state.registration.error = '';
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.registration.isLoading = false;
      state.registration.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.registration.error = action.error.message || 'Unknown error';
      state.registration.isLoading = false;
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.isAuth = false;
    });
  },
});

export default userSlice.reducer;
export const registerSelector = (state: RootState) => state.auth.registration;
export const loginSelector = (state: RootState) => state.auth.login;
export const authSelector = (state: RootState) => state.auth.isAuth;
export const authCheckingSelector = (state: RootState) => state.auth.isChecking;

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
      thunkAPI.dispatch(signIn({ login, password }));
    }
  }
);

export const checkAuth = createAsyncThunk('auth/check', async () => {
  // just try to fetch some data;
  // token will be will be taken from LS and placed to headers
  // if response will ok it means token works
  // if not user have to auth
  const response = await AuthService.checkAuth();
  if (response) {
    const token = localStorage.getItem(ELSKeys.token)!;
    return jwtDecode<TDecodedJWT>(token);
  }
  return response;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem(ELSKeys.token);
});
