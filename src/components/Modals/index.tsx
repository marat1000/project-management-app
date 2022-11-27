import React from 'react';
import { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import {
  selectEditBoardModalOpen,
  selectCreateColumnModalOpen,
  selectEditProfileModalOpen,
} from 'store/slices/modals/modalsSelectors';
import { EditBoardModal } from './EditBoardModal/EditBoardModal';
import { CreateColumnModal } from './CreateColumnModal/CreateColumnModal';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';

export const Modals = memo(() => {
  const isEditUserModalOpened = useAppSelector(selectEditProfileModalOpen);
  const isEditBoardModalOpened = useAppSelector(selectEditBoardModalOpen);
  const isCreateColumnModalOpened = useAppSelector(selectCreateColumnModalOpen);
  return (
    <>
      {isEditUserModalOpened && <EditProfileModal />}
      {isEditBoardModalOpened && <EditBoardModal />}
      {isCreateColumnModalOpened && <CreateColumnModal />}
    </>
  );
});
