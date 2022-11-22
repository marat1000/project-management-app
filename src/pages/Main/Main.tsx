import React, { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { logOut } from 'store/slices/authSlice';
import { toggleCreatingBoardModal } from 'store/slices/modalsSlice';
import { BoardsList } from './components/BoardsList';

export const Main = memo(() => {
  const dispatch = useAppDispatch();

  const openCreatingBoardModal = () => {
    dispatch(toggleCreatingBoardModal(true));
  };

  const logout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div className="main__container">
        <button onClick={logout}>Log Out</button>
        <button onClick={openCreatingBoardModal}>Add board</button>
        <BoardsList />
      </div>
    </>
  );
});
