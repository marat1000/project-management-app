import React, { memo, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authSelector } from 'store/slices/authSlice';
import { loadBoard, selectBoardById } from 'store/slices/boardsSlice';
import { ERoutes } from 'ts/enums';
import { IBoardExtended } from 'ts/interfaces';
import { ColumnsList } from './components/ColumnsList';

export const Board = memo(() => {
  const isAuth = useAppSelector(authSelector);
  const { id } = useParams();
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const boardData = useAppSelector(selectBoardById(id!));
  const dispatch = useAppDispatch();

  const addColumnHandler = () => {};

  useEffect(() => {
    // if the user went to this page via a link,
    // he will not have this board in the store
    if (!boardData) {
      dispatch(loadBoard(id!))
        .unwrap()
        // if returns null it means user no access to this board
        .then((res: IBoardExtended | null) => setIsAccessDenied(!res));
    }
  }, [id]);

  if (!isAuth) {
    return <Navigate to={ERoutes.singIn} />;
  }

  if (isAccessDenied) {
    return <div>Access is denied</div>;
  }

  if (!boardData) {
    return <div>Loading</div>;
  }

  const { title } = boardData;

  return (
    <div className="board-page__container">
      <div className="board-page__header">
        <h3>Board {title}</h3>
        <button onClick={addColumnHandler}> Add list +</button>
      </div>
      <ColumnsList></ColumnsList>
    </div>
  );
});
