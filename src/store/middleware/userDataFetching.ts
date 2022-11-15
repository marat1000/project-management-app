import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'store';
import { loadUserData } from 'store/slices/userSlice';

export const userDataFetching: Middleware =
  ({ /* getState, */ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
      case 'auth/check/fulfilled':
      case 'auth/login/fulfilled':
        dispatch(loadUserData(payload.id));
    }
    next(action);
  };
