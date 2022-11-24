import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalsState {
  editProfile: boolean;
  editBoard: boolean;
}

const initialState: IModalsState = {
  editProfile: false,
  editBoard: false,
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
  },
});

export default modalsSlice.reducer;

// Actions
export const { toggleEditProfileModal } = modalsSlice.actions;
export const { toggleEditBoardModal } = modalsSlice.actions;
