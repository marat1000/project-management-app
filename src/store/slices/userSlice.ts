import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { checkAuth, logOut, signIn } from './authSlice';

type IUserState = {
  id: string;
  name: string;
  login: string;
};
const initialState: IUserState = {
  id: '',
  name: '',
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
    });
  },
});

export default userSlice.reducer;

export const userLoginSelector = (state: RootState) => state.user.login;
export const userIdSelector = (state: RootState) => state.user.id;
export const userNameSelector = (state: RootState) => state.user.name;
