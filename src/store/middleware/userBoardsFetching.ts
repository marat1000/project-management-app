import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'store';
import { fetchUserBoards } from 'store/slices/boards/boardsThunks';

export const userBoardsFetching: Middleware =
  ({ /* getState, */ dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action: AnyAction) => {
    switch (action.type) {
      case 'user/dataFetch/fulfilled':
        dispatch(fetchUserBoards());
    }
    next(action);
  };
