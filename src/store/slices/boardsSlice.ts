import { createAsyncThunk, createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import BoardService, { isUserHaveAccessToBoard } from 'api/services/board';
import { RootState } from 'store';
import { IBoard, IBoardExtended } from 'ts/interfaces';
import { toggleEditBoardModal } from './modalsSlice';

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

    // /* *** Creating *** */
    builder.addCase(createBoard.fulfilled, (state, action) => {
      boardsAdapter.addOne(state, action.payload);
    });

    /* *** Delete *** */
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      boardsAdapter.removeOne(state, action.payload);
    });

    // /* *** Update *** */
    builder.addCase(updateBoard.fulfilled, (state, action) => {
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

export const boardsSelectors = boardsAdapter.getSelectors<RootState>((state) => state.boards);

export const { selectIds: selectBoardsIds } = boardsSelectors;
export const selectBoardById = (id: EntityId | null) => (state: RootState) => {
  if (!id) return null;
  return boardsSelectors.selectById(state, id);
};

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
