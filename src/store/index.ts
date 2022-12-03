import { configureStore } from '@reduxjs/toolkit';
import { clearSession, logOutWhenDelete } from './middleware/clearSession';
import { userBoardsFetching } from './middleware/userBoardsFetching';
import { userDataFetching } from './middleware/userDataFetching';
import authSlice from './slices/auth/authSlice';
import editBoardSlice from './slices/editBoard/editBoardSlice';
import modalsSlice from './slices/modals/modalsSlice';
import userSlice from './slices/user/userSlice';
import settingSlice from './slices/settings/settingsSlice';
import columnSlice from './slices/columns/columnsSlice';
import boardsSlice from './slices/boards/boardsSlice';
import tasksSlice from './slices/tasks/tasksSlice';
import dragsSlice from './slices/drags/dragsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    editBoard: editBoardSlice,
    boards: boardsSlice,
    settings: settingSlice,
    modals: modalsSlice,
    columns: columnSlice,
    drags: dragsSlice,
    tasks: tasksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userDataFetching,
      userBoardsFetching,
      clearSession,
      logOutWhenDelete
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch?: AppDispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};
