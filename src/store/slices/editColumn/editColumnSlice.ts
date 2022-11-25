import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { SyntheticEvent, useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { deleteBoard } from '../boards/boardsThunks';
import { endEditingBoard, startEditingBoard } from '../editBoard/editBoardThunks';
import { endEditingColumn } from './editColumnThunks';

// export const boardUsersAdapter = createEntityAdapter<IUser>({
//   selectId: (user) => user._id,
// });

export interface IEditingColumnData {
  title: string;
  columnId: string;
  boardID: string;
  order: number;
}

const initialData = {
  columnId: null,
  boardId: null,
  title: '',
  order: 1,
};

const editColumnSlice = createSlice({
  name: 'editBoard',
  initialState: {
    flags: {
      isLoading: false,
      error: '',
    },
    data: initialData,
  },
  reducers: {
    setInitialColumnValues: (state, action) => {
      state.data.columnId = action.payload.columnId;
      state.data.boardId = action.payload.boardId;
      state.data.title = action.payload.title;
    },
    setEditedColumnTitle: (state, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(endEditingColumn.pending, (state) => {
        state.flags.isLoading = true;
      })
      .addCase(endEditingColumn.fulfilled, (state) => {
        state.data = initialData;
        state.flags.isLoading = false;
      })
      .addCase(endEditingColumn.rejected, (state, action) => {
        state.data = initialData;
        state.flags.isLoading = false;
        state.flags.error = action.error.message || 'Unknown error';
      });

    //   .addCase(deleteBoard.pending, (state) => {
    //     state.flags.isLoading = true;
    //   })
    //   .addCase(deleteBoard.fulfilled, (state) => {
    //     state.flags.isLoading = false;
    //   })
    //   .addCase(deleteBoard.rejected, (state, action) => {
    //     state.flags.isLoading = false;
    //     state.flags.error = action.error.message || 'Unknown error';
    //   });
  },
});

export default editColumnSlice.reducer;

// Hooks
export const useEditColumnTitleOnChange = () => {
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const title = e.currentTarget.value;
      dispatch(setEditedColumnTitle(title));
    },
    [dispatch]
  );

  return onChange;
};

//Actions
export const { setEditedColumnTitle, setInitialColumnValues } = editColumnSlice.actions;
