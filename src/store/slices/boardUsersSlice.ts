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

const boardUsersSlice = createSlice({
  name: 'users',
  initialState: boardUsersAdapter.getInitialState<{ onSelectedBoard: EntityId[] }>({
    onSelectedBoard: [],
  }),
  reducers: {
    setOnSelectedBoardUsers: (state, action: PayloadAction<EntityId[]>) => {
      state.onSelectedBoard = action.payload;
    },

    addUserOnSelectedBoard: (state, action: PayloadAction<EntityId>) => {
      state.onSelectedBoard.push(action.payload);
    },

    removeUserOnSelectedBoard: (state, action: PayloadAction<EntityId>) => {
      state.onSelectedBoard = state.onSelectedBoard.filter((id) => id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    // TODO add errors
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      boardUsersAdapter.addMany(state, action.payload);
    });
  },
});

export default boardUsersSlice.reducer;

//Actions
export const { setOnSelectedBoardUsers, addUserOnSelectedBoard, removeUserOnSelectedBoard } =
  boardUsersSlice.actions;

// Selectors
const usersSelectors = boardUsersAdapter.getSelectors<RootState>((state) => state.boardUsers);
export const selectUserById = (id: EntityId) => (state: RootState) =>
  usersSelectors.selectById(state, id);

export const selectUsersIdsOnSelectedBoard = (state: RootState) => state.boardUsers.onSelectedBoard;
export const selectAllUsers = usersSelectors.selectAll;

// Thunks
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  const users = await UserService.getAllUsers();
  return users;
});
