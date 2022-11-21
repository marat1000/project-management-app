import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectBoardById } from 'store/slices/boardsSlice';
import dots from '../Svg/dots-dark.svg';

interface IBoardsItem {
  id: EntityId;
}

export const BoardsItem = memo<IBoardsItem>(({ id }) => {
  const boardData = useAppSelector(selectBoardById(id));

  // TODO fix it
  if (!boardData) {
    return <div>Error</div>;
  }

  // thanks backend
  const [title, description] = boardData.title.split('%');

  return (
    <div className="board-item">
      <header>
        <h3 className="board-item__title">{title}</h3>
        <img src={dots} />
      </header>
      <p className="board-item__description">{description}</p>
    </div>
  );
});
