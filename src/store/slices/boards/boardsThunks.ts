import { createAsyncThunk } from '@reduxjs/toolkit';
import BoardService, { isUserHaveAccessToBoard } from 'api/services/board';
import { RootState } from 'store';
import { IBoardExtended, IBoard } from 'ts/interfaces';
import { toggleEditBoardModal } from '../modalsSlice';

export interface ICreateBoardProps {
  title: string;
  users: string[];
}
export const createBoard = createAsyncThunk<
  IBoardExtended,
  ICreateBoardProps,
  {
    state: RootState;
  }
>('boards/createBoard', async (data, { getState, dispatch }) => {
  const owner = getState().user.id;
  const response = await BoardService.createBoard({ ...data, owner });
  dispatch(toggleEditBoardModal(false));
  return response;
});

export const fetchUserBoards = createAsyncThunk<
  IBoardExtended[],
  void,
  {
    state: RootState;
  }
>('boards/fetchUserBoards', async (_, { getState }) => {
  const { id } = getState().user;
  const response = await BoardService.loadUserBoards(id);
  return response;
});

export const deleteBoard = createAsyncThunk(
  'boards/delete',
  async (boardID: string, { dispatch }) => {
    const deleted = await BoardService.delete(boardID);
    dispatch(toggleEditBoardModal(false));
    return deleted;
  }
);

export const updateBoard = createAsyncThunk(
  'boards/update',
  async (board: IBoard, { dispatch }) => {
    const updated = await BoardService.update(board);
    dispatch(toggleEditBoardModal(false));
    return updated;
  }
);

export const loadBoard = createAsyncThunk<IBoardExtended | null, string, { state: RootState }>(
  'boards/load',
  async (boardID: string, { getState }) => {
    const userId = getState().user.id;
    const board = await BoardService.loadBoardData(boardID);
    if (!board) {
      throw new Error('Board not found');
    }
    if (!isUserHaveAccessToBoard(board, userId)) {
      throw new Error('Access is denied');
    }
    return board;
  }
);
