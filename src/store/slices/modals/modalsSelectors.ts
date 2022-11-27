import { RootState } from 'store';

export const selectEditProfileModalOpen = (state: RootState) => state.modals.editProfile;
export const selectEditBoardModalOpen = (state: RootState) => state.modals.editBoard;
export const selectCreateColumnModalOpen = (state: RootState) => state.modals.createColumn;
