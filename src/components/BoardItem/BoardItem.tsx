import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { startEditingBoard } from 'store/slices/editBoard/editBoardThunks';
import { ERoutes } from 'ts/enums';
import dots from '../Svg/dots-dark.svg';

interface IBoardsItem {
  id: EntityId;
}

export const BoardsItem = memo<IBoardsItem>(({ id }) => {
  const boardData = useAppSelector(selectBoardById(id));

  const dispatch = useAppDispatch();

  const editBoard = () => {
    dispatch(startEditingBoard(id));
  };

  // TODO fix it
  if (!boardData) {
    return <div>Error</div>;
  }

  // thanks backend
  const [title, description] = boardData.title.split('%');

  return (
    <div className="board-item">
      <header>
        <Link to={`${ERoutes.boards}/${id}`}>
          <h3 className="board-item__title">{title}</h3>
        </Link>
        <img onClick={editBoard} className="board-item__edit" src={dots} />
      </header>
      <p className="board-item__description">{description}</p>
    </div>
  );
});
