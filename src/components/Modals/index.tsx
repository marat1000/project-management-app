import React from 'react';
import { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectEditBoardModalOpen, selectEditProfileModalOpen } from 'store/slices/modalsSlice';
import { EditBoardModal } from './EditBoardModal/EditBoardModal';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';

export const Modals = memo(() => {
  const isEditUserModalOpened = useAppSelector(selectEditProfileModalOpen);
  const isEditBoardModalOpened = useAppSelector(selectEditBoardModalOpen);
  return (
    <>
      {isEditUserModalOpened && <EditProfileModal></EditProfileModal>}
      {isEditBoardModalOpened && <EditBoardModal></EditBoardModal>}
    </>
  );
});
