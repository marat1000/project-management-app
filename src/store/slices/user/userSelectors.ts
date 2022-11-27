import { RootState } from 'store';

export const selectUserLogin = (state: RootState) => state.user.login;
export const selectUserId = (state: RootState) => state.user.id;
export const selectUserEditFlags = (state: RootState) => state.user.flags;
export const selectUserName = (state: RootState) => state.user.username;
export const selectCurrentBoard = (state: RootState) => state.user.onBoard;
