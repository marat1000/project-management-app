import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalsState {
  editProfile: boolean;
  editBoard: boolean;
  createColumn: boolean;
}

const initialState: IModalsState = {
  editProfile: false,
  editBoard: false,
  createColumn: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleEditProfileModal: (state, action: PayloadAction<boolean>) => {
      state.editProfile = action.payload;
    },
    toggleEditBoardModal: (state, action: PayloadAction<boolean>) => {
      state.editBoard = action.payload;
    },
    toggleCreateColumnModal: (state, action: PayloadAction<boolean>) => {
      state.createColumn = action.payload;
    },
  },
});

export default modalsSlice.reducer;

// Actions
export const { toggleEditProfileModal, toggleEditBoardModal, toggleCreateColumnModal } =
  modalsSlice.actions;
