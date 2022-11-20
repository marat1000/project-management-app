import React, { memo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { authSelector } from 'store/slices/authSlice';
import { selectBoardById } from 'store/slices/boardsSlice';
import { ERoutes } from 'ts/enums';

export const Board = memo(() => {
  const isAuth = useAppSelector(authSelector);
  const { id } = useParams();
  const boardData = useAppSelector(selectBoardById(id!));

  if (!boardData) {
    // TODO
    // dispatch(loadOneBoardData(id))
    return <div>Loading</div>;
  }

  // TODO
  const addColumnHandler = () => {};

  const { title } = boardData;
  if (!isAuth) {
    return <Navigate to={ERoutes.singIn} />;
  }

  return (
    <div className="board-page__container">
      <div className="board-page__header">
        <h3>Board {title}</h3>
        <button onClick={addColumnHandler}> Add list +</button>
      </div>
    </div>
  );
});
