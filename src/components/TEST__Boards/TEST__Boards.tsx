import React from 'react';
import { memo } from 'react';
import { TEST__BoardsList } from './components/TEST_BoardsList';
import { TEST__AddBoardForm } from './components/TEST__AddBoardForm';

export const TEST__Boards = memo(() => {
  return (
    <>
      <h2>Boards</h2>
      <TEST__AddBoardForm />
      <TEST__BoardsList />
    </>
  );
});
