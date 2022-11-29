import { EntityId } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { startEditingBoard } from 'store/slices/editBoard/editBoardThunks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';
import { ERoutes } from 'ts/enums';
import dotsForLight from '../Svg/dots-dark.svg';
import dotsForDark from '../Svg/dots.svg';

interface IBoardsItem {
  id: EntityId;
}

export const BoardsItem = memo<IBoardsItem>(({ id }) => {
  const boardData = useAppSelector(selectBoardById(id));

  const dispatch = useAppDispatch();

  const isDark = useAppSelector(selectIsDark);

  const titleClassName = isDark ? 'board-item-dark' : 'board-item';

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
    <div className={titleClassName}>
      <header>
        <Link to={`${ERoutes.boards}/${id}`}>
          <h3 className={titleClassName + '__title'}>{title}</h3>
        </Link>
        <img
          onClick={editBoard}
          className={titleClassName + '__edit'}
          src={isDark ? dotsForDark : dotsForLight}
        />
      </header>
      <p className={titleClassName + '__description'}>{description}</p>
    </div>
  );
});
