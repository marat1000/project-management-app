import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { startEditingBoard } from 'store/slices/editBoard/editBoardThunks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';

export const AddBoardItem = memo(() => {
  const dispatch = useAppDispatch();
  const openModalCreateBoard = () => {
    dispatch(startEditingBoard());
  };
  const isDark = useAppSelector(selectIsDark);

  const mainClassName = isDark ? 'board-item-dark' : 'board-item';
  // как вариант потом переделать чтобы в пропсах принимался класс, и тогл чтобы можно было юзать и в добавлении тасков

  return (
    <div className={mainClassName}>
      <div onClick={openModalCreateBoard} className={mainClassName + '__plus'}>
        +
      </div>
    </div>
  );
});
