import React from 'react';
import { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import {
  selectEditBoardModalOpen,
  selectEditColumnModalOpen,
  selectEditProfileModalOpen,
} from 'store/slices/modals/modalsSelectors';
import { EditBoardModal } from './EditBoardModal/EditBoardModal';
import { EditColumnModal } from './EditColumnModal/EditColumnModal';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';

export const Modals = memo(() => {
  const isEditUserModalOpened = useAppSelector(selectEditProfileModalOpen);
  const isEditBoardModalOpened = useAppSelector(selectEditBoardModalOpen);
  const isEditColumnModalOpened = useAppSelector(selectEditColumnModalOpen);
  return (
    <>
      {isEditUserModalOpened && <EditProfileModal></EditProfileModal>}
      {isEditBoardModalOpened && <EditBoardModal></EditBoardModal>}
      {isEditColumnModalOpened && <EditColumnModal></EditColumnModal>}
    </>
  );
});
