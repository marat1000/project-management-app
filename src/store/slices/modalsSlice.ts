import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface IModalsState {
  creatingBoard: boolean;
  editProfile: boolean;
}

const initialState: IModalsState = {
  creatingBoard: false,
  editProfile: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleCreatingBoardModal: (state, action: PayloadAction<boolean>) => {
      state.creatingBoard = action.payload;
    },
    toggleEditProfileModal: (state, action: PayloadAction<boolean>) => {
      state.editProfile = action.payload;
    },
  },
});

export default modalsSlice.reducer;

// Actions
export const { toggleCreatingBoardModal } = modalsSlice.actions;
export const { toggleEditProfileModal } = modalsSlice.actions;

// Selectors
export const selectCreatingBoardModalOpen = (state: RootState) => state.modals.creatingBoard;
export const selectEditProfileModalOpen = (state: RootState) => state.modals.editProfile;
