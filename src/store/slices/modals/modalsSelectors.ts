import { RootState } from 'store';

export const selectEditProfileModalOpen = (state: RootState) => state.modals.editProfile;
export const selectEditBoardModalOpen = (state: RootState) => state.modals.editBoard;
