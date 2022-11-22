import React from 'react';
import { memo } from 'react';
import { CreatingBoardModal } from './CreatingBoardModal/CreatingBoardModal';
import { EditProfileModal } from './EditProfileModal/EditProfileModal';

export const Modals = memo(() => {
  return (
    <>
      <CreatingBoardModal></CreatingBoardModal>
      <EditProfileModal></EditProfileModal>
    </>
  );
});
