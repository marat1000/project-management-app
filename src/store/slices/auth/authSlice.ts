import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, signIn, signUp, logOut } from './authThunks';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.login.error = '';
    },
    clearRegistrationError: (state) => {
      state.registration.error = '';
    },
    clearEditProfileError: (state) => {
      state.registration.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.isChecking = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isChecking = true;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.isChecking = false;
      })

      .addCase(signIn.pending, (state) => {
        state.login.isLoading = true;
        state.login.error = '';
      })

      .addCase(signIn.fulfilled, (state) => {
        state.isAuth = true;
        state.login.isLoading = false;
        state.login.error = '';
      })

      .addCase(signIn.rejected, (state, action) => {
        state.login.error = action.error.message || 'Unknown error';
        state.login.isLoading = false;
      })

      .addCase(signUp.pending, (state) => {
        state.registration.isLoading = true;
        state.registration.error = '';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.registration.isLoading = false;
        state.registration.error = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.registration.error = action.error.message || 'Unknown error';
        state.registration.isLoading = false;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;

// Actions
export const { clearLoginError, clearRegistrationError, clearEditProfileError } = authSlice.actions;
