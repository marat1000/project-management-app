import React from 'react';
import { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { startEditingBoard } from 'store/slices/editBoardSlice';

export const AddBoardItem = memo(() => {
  const dispatch = useAppDispatch();
  const openModalCreateBoard = () => {
    dispatch(startEditingBoard());
  };

  // как вариант потом переделать чтобы в пропсах принимался класс, и тогл чтобы можно было юзать и в добавлении тасков

  return (
    <div className="board-item">
      <div onClick={openModalCreateBoard} className="board-item__plus">
        +
      </div>
    </div>
  );
});
