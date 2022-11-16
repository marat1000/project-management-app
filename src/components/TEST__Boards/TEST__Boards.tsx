import React from 'react';
import { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { logOut } from 'store/slices/authSlice';
import { TEST__BoardsList } from './components/TEST_BoardsList';
import { TEST__AddBoardForm } from './components/TEST__AddBoardForm';

export const TEST__Boards = memo(() => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h2>Boards</h2>
      <button onClick={() => dispatch(logOut())}>Logout</button>
      <TEST__AddBoardForm />
      <TEST__BoardsList />
    </>
  );
});
