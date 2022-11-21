import React, { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { toggleCreatingBoardModal } from 'store/slices/modalsSlice';
import { BoardsList } from './components/BoardsList';

export const Main = memo(() => {
  const dispatch = useAppDispatch();

  const openCreatingBoardModal = () => {
    dispatch(toggleCreatingBoardModal(true));
  };

  return (
    <>
      <div className="main__container">
        <button onClick={openCreatingBoardModal}>Add board</button>
        <BoardsList />
      </div>
    </>
  );
});
