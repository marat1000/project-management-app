import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuth, logOut, signIn } from '../auth/authThunks';
import { loadUserData, editUser, deleteUser } from './userThunks';

type IUserState = {
  id: string;
  login: string;
  username: string;
  flags: {
    isLoading: boolean;
    error: string;
  };
  onBoard: string;
};
const initialState: IUserState = {
  id: '',
  flags: {
    isLoading: false,
    error: '',
  },
  username: '',
  login: '',
  onBoard: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOnBoard: (state, action: PayloadAction<string>) => {
      state.onBoard = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        const { payload } = action;
        state.id = payload.id;
        state.login = payload.login;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        const { payload } = action;
        state.id = payload.id;
        state.login = payload.login;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.id = '';
        state.login = '';
        state.username = '';
      })

      .addCase(loadUserData.pending, (state) => {
        state.flags.error = '';
        state.flags.isLoading = true;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = '';
        state.username = action.payload;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = action.error.message || 'Unknown error';
      })

      .addCase(editUser.pending, (state) => {
        state.flags.error = '';
        state.flags.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = '';
        state.username = action.payload.name;
        state.login = action.payload.login;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = action.error.message || 'Unknown error';
      })

      .addCase(deleteUser.pending, (state) => {
        state.flags.error = '';
        state.flags.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.flags.isLoading = false;
        state.flags.error = '';
        state.id = '';
        state.login = '';
        state.username = '';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = action.error.message || 'Unknown error';
      });
  },
});

export const { setOnBoard } = userSlice.actions;

export default userSlice.reducer;
