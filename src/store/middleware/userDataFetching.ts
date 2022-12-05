import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'store';
import { loadUserData } from 'store/slices/user/userThunks';
import { ELSKeys } from 'ts/enums';
import { INIT_SOCKET_ACTION } from './socketMiddleware';

export const userDataFetching: Middleware =
  ({ /* getState, */ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
      case 'auth/check/fulfilled':
      case 'auth/login/fulfilled':
        localStorage.setItem(ELSKeys.userID, payload.id);
        dispatch(loadUserData(payload.id))
          .unwrap()
          .then(() => {
            dispatch(INIT_SOCKET_ACTION);
          });
    }
    next(action);
  };
