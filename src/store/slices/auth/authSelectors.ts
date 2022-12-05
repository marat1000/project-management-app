import { RootState } from 'store';

export const selectRegistrationFlags = (state: RootState) => state.auth.registration;
export const selectLoginFlags = (state: RootState) => state.auth.login;
export const selectAuthorizationFlag = (state: RootState) => state.auth.isAuth;
export const selectAuthCheckingFlag = (state: RootState) => state.auth.isChecking;
