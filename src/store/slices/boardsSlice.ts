import { createAsyncThunk, createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import BoardService, { isUserHaveAccessToBoard } from 'api/services/board';
import { RootState } from 'store';
import { IBoardExtended } from 'ts/interfaces';

const boardsAdapter = createEntityAdapter<IBoardExtended>({
  selectId: (book) => book._id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardsAdapter.getInitialState({
    creating: {
      isLoading: false,
      error: '',
    },
    fetching: {
      isLoading: false,
      error: '',
    },
    editing: {
      isLoading: false,
      error: '',
    },
  }),
  reducers: {
    removeAllBoards: boardsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    /* *** First fetching *** */
    builder.addCase(fetchUserBoards.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(fetchUserBoards.fulfilled, (state, action) => {
      boardsAdapter.addMany(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    builder.addCase(fetchUserBoards.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = action.error.message || 'Unknown error';
    });

    /* *** Creating *** */
    builder.addCase(createBoard.pending, (state) => {
      state.creating.isLoading = true;
      state.creating.error = '';
    });

    builder.addCase(createBoard.fulfilled, (state, action) => {
      boardsAdapter.addOne(state, action.payload);
      state.creating.isLoading = false;
      state.creating.error = '';
    });

    builder.addCase(createBoard.rejected, (state, action) => {
      state.creating.isLoading = false;
      state.creating.error = action.error.message || 'Unknown error';
    });

    /* *** Delete *** */
    builder.addCase(deleteBoard.pending, (state, action) => {
      const id = action.meta.arg;
      boardsAdapter.updateOne(state, { id, changes: { isProcessed: true } });
    });

    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      boardsAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deleteBoard.rejected, (state, action) => {
      const id = action.meta.arg;
      boardsAdapter.updateOne(state, { id, changes: { isProcessed: false } });
    });

    /* *** Update *** */
    builder.addCase(updateBoard.pending, (state, action) => {
      state.editing.isLoading = true;
      state.editing.error = '';
      const board = action.meta.arg;
      boardsAdapter.updateOne(state, { id: board._id, changes: { isProcessed: true } });
    });

    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.editing.isLoading = false;
      state.editing.error = '';
      const board = action.meta.arg;
      boardsAdapter.updateOne(state, { id: board._id, changes: { ...board, isProcessed: false } });
    });

    builder.addCase(updateBoard.rejected, (state, action) => {
      state.editing.isLoading = true;
      state.editing.error = action.error.message || 'unknown error';
      const board = action.meta.arg;
      boardsAdapter.updateOne(state, { id: board._id, changes: { ...board, isProcessed: false } });
    });

    builder.addCase(loadBoard.fulfilled, (state, action) => {
      const board = action.payload;
      if (board) {
        boardsAdapter.addOne(state, board);
      }
    });
  },
});

export const { removeAllBoards } = boardsSlice.actions;

const boardsSelectors = boardsAdapter.getSelectors<RootState>((state) => state.boards);

export const { selectIds: selectBoardsIds } = boardsSelectors;
export const selectBoardById = (id: EntityId) => (state: RootState) => {
  return boardsSelectors.selectById(state, id);
};
export const creatingBoardFlagsSelector = (state: RootState) => state.boards.creating;
export const editingBoardFlagsSelector = (state: RootState) => state.boards.editing;

export default boardsSlice.reducer;

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
>('boards/createBoard', async (data, { getState }) => {
  const owner = getState().user.id;
  const response = await BoardService.createBoard({ ...data, owner });
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

export const deleteBoard = createAsyncThunk('boards/delete', async (boardID: string) => {
  const deleted = await BoardService.delete(boardID);
  return deleted;
});

export const updateBoard = createAsyncThunk('boards/update', async (board: IBoardExtended) => {
  const updated = await BoardService.update(board);
  return updated;
});

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
