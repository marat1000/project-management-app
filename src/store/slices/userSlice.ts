import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from 'api/services/user';
import { RootState } from 'store';
import { IEditUserParams, IUser } from 'ts/interfaces';
import { checkAuth, logOut, signIn } from './auth/authThunks';
import { toggleEditProfileModal } from './modalsSlice';

type IUserState = {
  id: string;
  login: string;
  username: string;
  flags: {
    isLoading: boolean;
    error: string;
  };
};
const initialState: IUserState = {
  id: '',
  flags: {
    isLoading: false,
    error: '',
  },
  username: '',
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
      state.username = '';
    });

    builder.addCase(loadUserData.pending, (state) => {
      state.flags.error = '';
      state.flags.isLoading = true;
    });

    builder.addCase(loadUserData.fulfilled, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = '';
      state.username = action.payload;
    });

    builder.addCase(loadUserData.rejected, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = action.error.message || 'Unknown error';
    });

    builder.addCase(editUser.pending, (state) => {
      state.flags.error = '';
      state.flags.isLoading = true;
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = '';
      state.username = action.payload.name;
      state.login = action.payload.login;
    });

    builder.addCase(editUser.rejected, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = action.error.message || 'Unknown error';
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.flags.error = '';
      state.flags.isLoading = true;
    });

    builder.addCase(deleteUser.fulfilled, (state) => {
      state.flags.isLoading = false;
      state.flags.error = '';
      state.id = '';
      state.login = '';
      state.username = '';
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = action.error.message || 'Unknown error';
    });
  },
});

export default userSlice.reducer;

export const selectUserLogin = (state: RootState) => state.user.login;
export const selectUserId = (state: RootState) => state.user.id;
export const selectUserEditFlags = (state: RootState) => state.user.flags;
export const selectUserName = (state: RootState) => state.user.username;

export const loadUserData = createAsyncThunk('user/dataFetch', async (id: string) => {
  const response = await UserService.getUser(id);
  return response.data.name;
});

export const editUser = createAsyncThunk<IUser, IEditUserParams, { state: RootState }>(
  'user/editUser',
  async (body, { getState, dispatch }) => {
    const id = getState().user.id;
    const response = await UserService.editUser(id, body);
    dispatch(toggleEditProfileModal(false));
    return response;
  }
);

export const deleteUser = createAsyncThunk('user/delete', async (id: string, { dispatch }) => {
  const status = await UserService.deleteUser(id);
  dispatch(toggleEditProfileModal(false));
  return status;
});
