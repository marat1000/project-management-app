import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { AppDispatch, RootState } from 'store';
import { logOut } from 'store/slices/auth/authThunks';
import { removeAllBoards } from 'store/slices/boardsSlice';

export const clearSession: Middleware =
  ({ /* getState, */ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action: AnyAction) => {
    switch (action.type) {
      case 'auth/logout/fulfilled':
        dispatch(removeAllBoards());
    }
    next(action);
  };

export const logOutWhenDelete: Middleware =
  ({ /* getState, */ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action: AnyAction) => {
    switch (action.type) {
      case 'user/delete/fulfilled':
        dispatch(logOut());
    }
    next(action);
  };
