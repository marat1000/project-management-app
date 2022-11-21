import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface IModalsState {
  creatingBoard: boolean;
}

const initialState: IModalsState = {
  creatingBoard: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleCreatingBoardModal: (state, action: PayloadAction<boolean>) => {
      state.creatingBoard = action.payload;
    },
  },
});

export default modalsSlice.reducer;

// Actions
export const { toggleCreatingBoardModal } = modalsSlice.actions;

// Selectors
export const selectCreatingBoardModalOpen = (state: RootState) => state.modals.creatingBoard;
