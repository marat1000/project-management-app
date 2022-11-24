import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from 'api/services/user';
import { RootState } from 'store';
import { IUser } from 'ts/interfaces';
import { boardsSelectors } from '../boards/boardsSelectors';
import { updateBoard, createBoard } from '../boards/boardsThunks';
import { toggleEditBoardModal } from '../modals/modalsSlice';
import { IEditingBoardData } from './editBoardSlice';

interface ICreateOrEditBoardsPayload {
  users: IUser[];
  boardData: IEditingBoardData;
}

interface IRowBoardData {
  title: string;
  users: EntityId[];
}

export const startEditingBoard = createAsyncThunk<
  ICreateOrEditBoardsPayload,
  EntityId | undefined,
  { state: RootState }
>('editBoard/startEditingBoard', async (id, { getState, dispatch }) => {
  // if calls without id, it means we try to create a new board

  // first - open modal
  dispatch(toggleEditBoardModal(true));

  // second -
  // if we try to create new board set all boardData in editBoardSlice to default
  // if we edit board - catch all data about this board from boardSlice
  const rowBoardData: IRowBoardData = id
    ? boardsSelectors.selectById(getState(), id)!
    : { title: '%', users: [] };

  const [title, ...rowDescription] = rowBoardData.title.split('%');
  const description = rowDescription.join('%');
  const boardData = { id: id || null, description, title, users: [...rowBoardData.users] };

  // third
  // load data about all users
  // this data is used when looking for a user to add to the board
  const users = await UserService.getAllUsers();

  // and finally return all data
  // this will be catch in editBoardSlice extraReducers in fulfilled
  return {
    users,
    boardData,
  };
});

export const endEditingBoard = createAsyncThunk<boolean, void, { state: RootState }>(
  'editBoard/endEditingBoard',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { id, title, description, users } = state.editBoard.data;
    const userId = state.user.id;

    if (id) {
      const board = {
        _id: id as string,
        title: `${title}%${description}`,
        users: users as string[],
        owner: userId,
      };
      await dispatch(updateBoard(board)).unwrap();
      return true;
    } else {
      const board = {
        title: `${title}%${description}`,
        users: users as string[],
        owner: userId,
      };
      await dispatch(createBoard(board)).unwrap();
      return true;
    }
  }
);
