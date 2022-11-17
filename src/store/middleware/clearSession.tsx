import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { AppDispatch, RootState } from 'store';
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
