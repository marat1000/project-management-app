import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { SyntheticEvent, useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { IUser } from 'ts/interfaces';
import { deleteBoard } from '../boards/boardsThunks';
import { startEditingBoard, endEditingBoard } from './editBoardThunks';

export const boardUsersAdapter = createEntityAdapter<IUser>({
  selectId: (user) => user._id,
});

export interface IEditingBoardData {
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
    builder
      .addCase(startEditingBoard.pending, (state) => {
        state.flags.isLoading = true;
      })
      .addCase(startEditingBoard.fulfilled, (state, action) => {
        state.flags.isLoading = false;
        const { users, boardData } = action.payload;
        boardUsersAdapter.setAll(state, users);
        state.data = boardData;
      })
      .addCase(startEditingBoard.rejected, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = action.error.message || 'Unknown error';
      })

      .addCase(endEditingBoard.pending, (state) => {
        state.flags.isLoading = true;
      })
      .addCase(endEditingBoard.fulfilled, (state) => {
        state.flags.isLoading = false;
      })
      .addCase(endEditingBoard.rejected, (state, action) => {
        state.flags.isLoading = false;
        state.flags.error = action.error.message || 'Unknown error';
      })

      .addCase(deleteBoard.pending, (state) => {
        state.flags.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.flags.isLoading = false;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
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
