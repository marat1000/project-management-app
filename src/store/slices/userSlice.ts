import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from 'api/services/user';
import { RootState } from 'store';
import { IEditUserParams, IUser } from 'ts/interfaces';
import { checkAuth, logOut, signIn } from './authSlice';

type IUserState = {
  id: string;
  login: string;
  name: {
    isLoading: boolean;
    username: string;
    error: string;
  };
};
const initialState: IUserState = {
  id: '',
  name: {
    isLoading: false,
    username: '',
    error: '',
  },
  login: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { payload } = action;
      state.id = payload.id;
      state.login = payload.login;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      const { payload } = action;
      state.id = payload.id;
      state.login = payload.login;
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.id = '';
      state.login = '';
      state.name.username = '';
    });

    builder.addCase(loadUserData.pending, (state) => {
      state.name.error = '';
      state.name.isLoading = true;
    });

    builder.addCase(loadUserData.fulfilled, (state, action) => {
      state.name.isLoading = false;
      state.name.error = '';
      state.name.username = action.payload;
    });

    builder.addCase(loadUserData.rejected, (state, action) => {
      state.name.isLoading = false;
      state.name.error = action.error.message || 'Unknown error';
    });
    builder.addCase(editUser.pending, (state) => {
      state.name.error = '';
      state.name.isLoading = true;
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      state.name.isLoading = false;
      state.name.error = '';
      state.name.username = action.payload.name;
      state.login = action.payload.login;
    });

    builder.addCase(editUser.rejected, (state, action) => {
      state.name.isLoading = false;
      state.name.error = action.error.message || 'Unknown error';
    });
  },
});

export default userSlice.reducer;

export const userLoginSelector = (state: RootState) => state.user.login;
export const userIdSelector = (state: RootState) => state.user.id;
export const userNameSelector = (state: RootState) => state.user.name;

export const loadUserData = createAsyncThunk('user/dataFetch', async (id: string) => {
  const response = await UserService.getUser(id);
  return response.data.name;
});

export const editUser = createAsyncThunk<IUser, IEditUserParams, { state: RootState }>(
  'user/editUser',
  async (body, thunkAPI) => {
    const id = thunkAPI.getState().user.id;
    const response = await UserService.editUser(id, body);
    return response;
  }
);
