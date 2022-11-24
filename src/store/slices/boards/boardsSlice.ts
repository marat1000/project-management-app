import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IBoardExtended } from 'ts/interfaces';
import { fetchUserBoards, createBoard, deleteBoard, updateBoard, loadBoard } from './boardsThunks';

export const boardsAdapter = createEntityAdapter<IBoardExtended>({
  selectId: (book) => book._id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardsAdapter.getInitialState({
    fetching: {
      isLoading: false,
      error: '',
    },
  }),
  reducers: {
    removeAllBoards: boardsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.pending, (state) => {
        state.fetching.isLoading = true;
        state.fetching.error = '';
      })

      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        boardsAdapter.addMany(state, action.payload);
        state.fetching.isLoading = false;
        state.fetching.error = '';
      })

      .addCase(fetchUserBoards.rejected, (state, action) => {
        state.fetching.isLoading = false;
        state.fetching.error = action.error.message || 'Unknown error';
      })

      .addCase(createBoard.fulfilled, (state, action) => {
        boardsAdapter.addOne(state, action.payload);
      })

      .addCase(deleteBoard.fulfilled, (state, action) => {
        boardsAdapter.removeOne(state, action.payload);
      })

      .addCase(updateBoard.fulfilled, (state, action) => {
        const board = action.meta.arg;
        boardsAdapter.updateOne(state, {
          id: board._id,
          changes: { ...board, isProcessed: false },
        });
      })

      .addCase(loadBoard.fulfilled, (state, action) => {
        const board = action.payload;
        if (board) {
          boardsAdapter.addOne(state, board);
        }
      });
  },
});

export const { removeAllBoards } = boardsSlice.actions;

export default boardsSlice.reducer;
