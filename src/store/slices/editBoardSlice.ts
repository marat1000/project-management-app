import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import { UserService } from 'api/services/user';
import { RootState } from 'store';
import { IUser } from 'ts/interfaces';

const boardUsersAdapter = createEntityAdapter<IUser>({
  selectId: (user) => user._id,
});

const editBoardSlice = createSlice({
  name: 'editBoard',
  initialState: boardUsersAdapter.getInitialState<{
    boardUsers: EntityId[];
    currentBoardID: EntityId;
  }>({
    boardUsers: [],
    currentBoardID: 0,
  }),
  reducers: {
    setCurrentBoardID: (state, action: PayloadAction<EntityId>) => {
      state.currentBoardID = action.payload;
    },

    setBoardUsers: (state, action: PayloadAction<EntityId[]>) => {
      state.boardUsers = action.payload;
    },

    addBoardUser: (state, action: PayloadAction<EntityId>) => {
      state.boardUsers.push(action.payload);
    },

    removeBoardUser: (state, action: PayloadAction<EntityId>) => {
      state.boardUsers = state.boardUsers.filter((id) => id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    // TODO add errors
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      boardUsersAdapter.addMany(state, action.payload);
    });
  },
});

export default editBoardSlice.reducer;

//Actions
export const { setBoardUsers, addBoardUser, removeBoardUser, setCurrentBoardID } =
  editBoardSlice.actions;

// Selectors
const usersSelectors = boardUsersAdapter.getSelectors<RootState>((state) => state.editBoard);
export const selectUserById = (id: EntityId) => (state: RootState) =>
  usersSelectors.selectById(state, id);

export const selectBoardUsers = (state: RootState) => state.editBoard.boardUsers;
export const selectCurrentBoardID = (state: RootState) => state.editBoard.currentBoardID;
export const selectAllUsers = usersSelectors.selectAll;

// Thunks
export const fetchAllUsers = createAsyncThunk('editBoard/fetchAllUsers', async () => {
  const users = await UserService.getAllUsers();
  return users;
});
