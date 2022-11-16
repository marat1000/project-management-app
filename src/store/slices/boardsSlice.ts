import { createAsyncThunk, createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import BoardService from 'api/services/board';
import { RootState } from 'store';
import { IBoard } from 'ts/interfaces';

const boardsAdapter = createEntityAdapter<IBoard>({
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
  }),
  reducers: {
    removeAllBoards: boardsAdapter.removeAll,
  },
  extraReducers: (builder) => {
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
  },
});

export const { removeAllBoards } = boardsSlice.actions;

const boardsSelectors = boardsAdapter.getSelectors<RootState>((state) => state.boards);
export const { selectIds: selectBoardsIds } = boardsSelectors;
export const selectBoardById = (id: EntityId) => (state: RootState) =>
  boardsSelectors.selectById(state, id);

export default boardsSlice.reducer;

export interface ICreateBoardProps {
  title: string;
  users: string[];
}
export const createBoard = createAsyncThunk<
  IBoard,
  ICreateBoardProps,
  {
    state: RootState;
  }
>('boards/createBoard', async (data, { getState }) => {
  const owner = getState().user.id;
  const response = await BoardService.createBoard({ ...data, owner });
  return response.data;
});

export const fetchUserBoards = createAsyncThunk<
  IBoard[],
  void,
  {
    state: RootState;
  }
>('boards/fetchUserBoards', async (_, { getState }) => {
  const { id } = getState().user;
  const response = await BoardService.loadUserBoards(id);
  return response;
});
