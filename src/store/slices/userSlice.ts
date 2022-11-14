import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IUserState {
  isAuth: boolean;
  name: string;
}

const initialState: IUserState = {
  isAuth: false,
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setAuth, setName } = userSlice.actions;
export const userNameSelector = (state: RootState) => state.user.name;

type TRegisterProps = {
  login: string;
  password: string;
};
// export const register = createAsyncThunk(
//   'user/registration',
//   async ({ login, password }: TRegisterProps, thunkApi) => {

//   }
// );
