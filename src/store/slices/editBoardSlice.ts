import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserService } from 'api/services/user';
import { SyntheticEvent, useCallback } from 'react';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { IUser } from 'ts/interfaces';
import { boardsSelectors, createBoard, deleteBoard, updateBoard } from './boardsSlice';
import { toggleEditBoardModal } from './modalsSlice';

const boardUsersAdapter = createEntityAdapter<IUser>({
  selectId: (user) => user._id,
});

interface IEditingBoardData {
  users: EntityId[];
  title: string;
  description: string;
  id: EntityId | null;
}

const editBoardSlice = createSlice({
  name: 'editBoard',
  initialState: boardUsersAdapter.getInitialState<{
    data: IEditingBoardData;
    flags: {
      isLoading: boolean;
      error: string;
    };
  }>({
    flags: {
      isLoading: false,
      error: '',
    },
    data: {
      id: null,
      users: [],
      title: '',
      description: '',
    },
  }),
  reducers: {
    addEditedBoardUser: (state, action: PayloadAction<EntityId>) => {
      state.data.users.push(action.payload);
    },

    removeEditedBoardUser: (state, action: PayloadAction<EntityId>) => {
      state.data.users = state.data.users.filter((id) => id !== action.payload);
    },

    setEditedBoardTitle: (state, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },

    setEditedBoardDescription: (state, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(startEditingBoard.pending, (state) => {
      state.flags.isLoading = true;
    });
    builder.addCase(startEditingBoard.fulfilled, (state, action) => {
      state.flags.isLoading = false;
      const { users, boardData } = action.payload;
      boardUsersAdapter.setAll(state, users);
      state.data = boardData;
    });
    builder.addCase(startEditingBoard.rejected, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = action.error.message || 'Unknown error';
    });

    builder.addCase(endEditingBoard.pending, (state) => {
      state.flags.isLoading = true;
    });

    builder.addCase(endEditingBoard.fulfilled, (state) => {
      state.flags.isLoading = false;
    });

    builder.addCase(endEditingBoard.rejected, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = action.error.message || 'Unknown error';
    });

    builder.addCase(deleteBoard.pending, (state) => {
      state.flags.isLoading = true;
    });

    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.flags.isLoading = false;
    });

    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.flags.isLoading = false;
      state.flags.error = action.error.message || 'Unknown error';
    });
  },
});

export default editBoardSlice.reducer;

// Hooks
export const useEditBoardTitleOnChange = () => {
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const title = e.currentTarget.value;
      dispatch(setEditedBoardTitle(title));
    },
    [dispatch]
  );

  return onChange;
};

export const useEditBoardDescriptionOnChange = () => {
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) => {
      const description = e.currentTarget.value;
      dispatch(setEditedBoardDescription(description));
    },
    [dispatch]
  );

  return onChange;
};

//Actions
export const {
  addEditedBoardUser,
  removeEditedBoardUser,
  setEditedBoardTitle,
  setEditedBoardDescription,
} = editBoardSlice.actions;

// Selectors
const usersSelectors = boardUsersAdapter.getSelectors<RootState>((state) => state.editBoard);
export const selectUserById = (id: EntityId) => (state: RootState) =>
  usersSelectors.selectById(state, id);
export const selectEditedBoardFlags = (state: RootState) => state.editBoard.flags;
export const selectEditedBoardId = (state: RootState) => state.editBoard.data.id;
export const selectBoardUsers = (state: RootState) => state.editBoard.data.users;
export const selectAllUsers = usersSelectors.selectAll;

// Thunks
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
