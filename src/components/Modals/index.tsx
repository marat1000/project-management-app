import React from 'react';
import { memo } from 'react';
import { CreatingBoardModal } from './CreatingBoardModal/CreatingBoardModal';
import { EditBoardModal } from './EditBoardModal/EditBoardModal';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';

export const Modals = memo(() => {
  return (
    <>
      <CreatingBoardModal></CreatingBoardModal>
      <EditProfileModal></EditProfileModal>
      <EditBoardModal></EditBoardModal>
    </>
  );
});
