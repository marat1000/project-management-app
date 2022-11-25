import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalsState {
  editProfile: boolean;
  editBoard: boolean;
  editColumn: boolean;
}

const initialState: IModalsState = {
  editProfile: false,
  editBoard: false,
  editColumn: false,
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
    toggleEditColumnModal: (state, action: PayloadAction<boolean>) => {
      state.editColumn = action.payload;
    },
  },
});

export default modalsSlice.reducer;

// Actions
export const { toggleEditProfileModal, toggleEditBoardModal, toggleEditColumnModal } =
  modalsSlice.actions;
