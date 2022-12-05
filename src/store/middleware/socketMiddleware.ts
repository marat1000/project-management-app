import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import ClientSocket from 'socket/clientSocket';
import { AppDispatch, RootState } from 'store';
import { deleteBoardSocket } from 'store/slices/boards/boardsSlice';
import { loadBoardsSocket } from 'store/slices/boards/boardsThunks';
import { deleteColumnSocket, loadColumnsSocket } from 'store/slices/columns/columnsSlice';
import { deleteTaskSocket } from 'store/slices/tasks/tasksSlice';
import { loadTasksSocket } from 'store/slices/tasks/tasksThunks';

export const INIT_SOCKET_ACTION_TYPE = 'initSocket';

export const INIT_SOCKET_ACTION = {
  type: INIT_SOCKET_ACTION_TYPE,
};

type TSocketData = {
  action: 'add' | 'update' | 'delete'; // Тип изменения в базе
  users: string[]; // Список id юзеров, которые имеют доступ к данным об обновлении чего-то в базе(Например, при изменении колонки здесь будет список из владельца доски и приглашенных на нее пользователей)
  ids: string[]; // Список id созданных/измененных/удаленных записей в базе
  guid: string; // Уникальный код запроса (Присваивается в хэддере Guid запроса на бэкенд)
  notify: boolean; // Нужно ли уведомлять текущего пользователя об изменениях в базе
  initUser: string; // id пользователя, инициировавшего изменения в базе (Присваивается в хэддере initUser запроса на бэкенд)
};

const applyBoardListeners = (
  socket: ClientSocket,
  getState: () => RootState,
  dispatch: AppDispatch
) => {
  socket.on('boards', (data: TSocketData) => {
    const state = getState();
    const userID = state.user.id;
    if (userID === data.initUser) {
      return;
    }

    if (data.action === 'delete') {
      if (data.users.includes(userID)) {
        dispatch(deleteBoardSocket(data.ids[0]));
      }
    }
    if (data.action === 'update') {
      // backend returns empty array of users
      // if (state.boards.entities[data.ids[0]]) {
      dispatch(loadBoardsSocket(data.ids));
      // }
    }

    if (data.action === 'add') {
      dispatch(loadBoardsSocket(data.ids));
    }
  });
};

const applyColumnListeners = (
  socket: ClientSocket,
  getState: () => RootState,
  dispatch: AppDispatch
) => {
  socket.on('columns', (data: TSocketData) => {
    const state = getState();
    const userID = state.user.id;
    if (userID === data.initUser) {
      return;
    }

    if (data.users.includes(userID)) {
      if (data.action === 'delete') {
        dispatch(deleteColumnSocket(data.ids[0]));
      }

      if (data.action === 'add') {
        dispatch(loadColumnsSocket(data.ids));
      }

      if (data.action === 'update') {
        dispatch(loadColumnsSocket(data.ids));
      }
    }
  });
};

const applyTasksListeners = (
  socket: ClientSocket,
  getState: () => RootState,
  dispatch: AppDispatch
) => {
  socket.on<TSocketData>('tasks', (data) => {
    const state = getState();
    const userID = state.user.id;
    if (userID === data.initUser) {
      return;
    }

    if (data.users.includes(userID)) {
      if (data.action === 'delete') {
        dispatch(deleteTaskSocket(data.ids[0]));
      }
      if (data.action === 'add') {
        dispatch(loadTasksSocket(data.ids));
      }
      if (data.action === 'update') {
        dispatch(loadTasksSocket(data.ids));
      }
    }
  });
};

export const socketMiddleware =
  (socket: ClientSocket): Middleware =>
  ({ getState, dispatch }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next) =>
  (action: AnyAction) => {
    if (action.type === INIT_SOCKET_ACTION_TYPE) {
      socket.connect();
      applyBoardListeners(socket, getState, dispatch);
      applyColumnListeners(socket, getState, dispatch);
      applyTasksListeners(socket, getState, dispatch);
    }
    next(action);
  };
