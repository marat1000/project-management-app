import { EditProfile } from 'pages/Profile';
import React from 'react';
import { memo } from 'react';
import { CreatingBoardModal } from './CreatingBoardModal/CreatingBoardModal';

export const Modals = memo(() => {
  return (
    <>
      <CreatingBoardModal></CreatingBoardModal>
      <EditProfile></EditProfile>
    </>
  );
});
