import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from 'api/services/auth';
import { RootState } from 'store';
import { ELSKeys } from 'ts/enums';

export interface IAuthState {
  isAuth: boolean;
  userLogin: string;
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
  userLogin: '',
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
    builder.addCase(signIn.pending, (state) => {
      state.login.isLoading = true;
      state.login.error = '';
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userLogin = action.payload;
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
  },
});

export default userSlice.reducer;
export const registerSelector = (state: RootState) => state.auth.registration;
export const loginSelector = (state: RootState) => state.auth.login;
export const authSelector = (state: RootState) => state.auth.isAuth;
export const userLoginSelector = (state: RootState) => state.auth.userLogin;

type TRegisterProps = {
  name: string;
  login: string;
  password: string;
};

type TLoginProps = {
  login: string;
  password: string;
};

export const signIn = createAsyncThunk('auth/login', async ({ login, password }: TLoginProps) => {
  const response = await AuthService.signIn(login, password);
  if (response) {
    localStorage.setItem(ELSKeys.token, response.data.token);
  }
  return login;
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
